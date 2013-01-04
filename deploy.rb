require 'rubygems'
require 'jsmin'

JMASK_FILE = 'jquery.mask.js'
JMASK_MIN_FILE = 'jquery.mask.min.js'
JMASK_VERSION = `stepup version --next-release`.delete("\n")

abort("No notes, do deal.") if JMASK_VERSION.empty?

puts '# PUTTING NEW VERSION INSIDE OF JQUERY MASK FILE'
unversioned_jmask_file = File.open(JMASK_FILE, 'rb') { |file| file.read }
File.open(JMASK_FILE, 'w') do |file| 
  file.write(unversioned_jmask_file.gsub(/\* @version: (v[0-9.+]+)/, "\* @version: #{JMASK_VERSION}"))
end

puts '# GENERATING MIN FILE'
File.open(JMASK_FILE, 'r') do |file| 
  minFile = File.new(JMASK_MIN_FILE, 'w')
  minFile.puts("// jQuery Mask Plugin #{JMASK_VERSION}")
  minFile.puts("// github.com/igorescobar/jQuery-Mask-Plugin") 
  minFile.puts(JSMin.minify(file))
  minFile.close
end

puts '# GENERATING A NEW COMMIT WITH VERSIONED FILEs'
`git commit -am 'generating jquery mask files #{JMASK_VERSION}'`

puts '# CREATING NEW VERSION'
`stepup version create --no-editor`

puts '# DONE'
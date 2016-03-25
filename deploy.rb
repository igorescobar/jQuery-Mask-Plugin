require 'rubygems'
require 'zlib'

JMASK_FILE = 'src/jquery.mask.js'
JMASK_MIN_FILE = 'dist/jquery.mask.min.js'
GHPAGES_JMASK_MIN_FILE = 'js/jquery.mask.min.js'
JMASK_VERSION = `stepup version --next-release`.delete("\n")
BOWER_MANIFEST_FILE = 'bower.json'
NPM_MANIFEST_FILE = 'package.json'
METEOR_MANIFEST_FILE = 'package.js'
COMPONENT_MANIFEST_FILE = 'component.json'

abort("No notes, do deal.") if JMASK_VERSION.empty?

puts '# PUTTING NEW VERSION INSIDE OF JQUERY MASK FILE'
unversioned_jmask_file = File.open(JMASK_FILE, 'rb') { |file| file.read }
File.open(JMASK_FILE, 'w') do |file|
  file.write(unversioned_jmask_file.gsub(/\* @version: (v[0-9.+]+)/, "\* @version: #{JMASK_VERSION}"))
end

puts '# COPYING NEW JMASK FILE TO DIST/'
`yes | cp #{JMASK_FILE} dist/`

[BOWER_MANIFEST_FILE, NPM_MANIFEST_FILE, COMPONENT_MANIFEST_FILE, METEOR_MANIFEST_FILE].each { |manifest_name|
  puts "# UPGRADING #{manifest_name} "
  manifest_file = File.open(manifest_name, 'rb') { |file| file.read }
  File.open(manifest_name, 'w') do |file|
    file.write(manifest_file.gsub(/"version": "([0-9.+]+)"/, "\"version\": \"#{JMASK_VERSION.gsub("v", "")}\""))
  end
}

puts '# GENERATING MIN FILE'
jquery_mask_min_file = nil
File.open(JMASK_FILE, 'r') do |file|
  minFile = File.open(JMASK_MIN_FILE, 'w')
  minFile.puts("// jQuery Mask Plugin #{JMASK_VERSION}")
  minFile.puts("// github.com/igorescobar/jQuery-Mask-Plugin")
  jquery_mask_min_file = `java -jar ../clojure-compiler/compiler.jar --js src/jquery.mask.js --charset UTF-8`
  minFile.puts(jquery_mask_min_file)
  minFile.close
end

puts '# GENERATING A NEW COMMIT WITH VERSIONED FILEs'
`git commit -am 'generating jquery mask files #{JMASK_VERSION}'`

puts '# PUSHING CHANGES TO REMOTE'
`git pull --rebase && git push`

puts '# CREATING NEW VERSION'
`stepup version create --no-editor`

puts '# UPGRATING CHANGELOG'
`stepup changelog --format=wiki > CHANGELOG.md`
`git commit -am "upgrading changelog"`
`git push`

puts '# UPGRADING gh-pages'
`git checkout gh-pages`
`git pull origin gh-pages`

minFile = File.open(GHPAGES_JMASK_MIN_FILE, 'w')
minFile.puts("// jQuery Mask Plugin #{JMASK_VERSION}")
minFile.puts("// github.com/igorescobar/jQuery-Mask-Plugin")
minFile.puts(jquery_mask_min_file)
minFile.close

`git commit -am "upgrading plugin file"`
`git push`
`git checkout master`

puts '# PUBLISHING NPM PACKAGE'
`npm publish`

puts '# PUBLISHING METEOR PACKAGE'
`meteor publish`

puts '# DONE!'

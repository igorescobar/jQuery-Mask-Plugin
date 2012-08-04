require 'rubygems'
require 'jsmin'

File.open('jquery.mask.js', 'r') do |file| 
  minFile = File.new('jquery.mask.min.js', 'w') 
  minFile.puts(JSMin.minify(file))
end
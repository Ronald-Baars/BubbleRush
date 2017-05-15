
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end



activate :livereload # Enable Live reloading
activate :sprockets # Enable JS combining



page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false




configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :minify_html
end




activate :deploy do |deploy|
	deploy.build_before = true

	deploy.deploy_method   = :ftp
	deploy.host            = '95.85.49.234'
	deploy.path            = '/'
	deploy.user            = 'bubblerushronaldbaarsnl'
	deploy.password        = 'afd7c4fe-d5ce-4d92-b529-b95b516c59ac'
end

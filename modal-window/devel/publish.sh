npm publish --access public --dry-run

echo "Do you want to publish this package? (y/n)"

read answer

if [ "$answer" != "${answer#[Yy]}" ] ;then
    npm publish --access public
else
    echo "Publishing aborted"
fi
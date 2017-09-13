for folder in components stores
do
	documentation build js/$folder --config js/$folder/documentation.yml --document-exported -f md -o js/$folder/API.md --sort-order alpha
done

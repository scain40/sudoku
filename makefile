all: clean install serve

serve:
	ng serve

install:
	npm install

clean:
	rm -rf node_modules
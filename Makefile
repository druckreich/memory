image_name=memo

build:
	docker build -t ${image_name}:latest .

generate-release:
	docker run --rm \
			-v ~/.gradle:/root/.gradle \
			${image_name}:latest \
			ionic cordova build android --prod --release

generate-debug:
	docker run --rm \
		-v ~/.gradle:/root/.gradle \
		${image_name}:latest \
		ionic cordova build android --debug

android:
	docker run --rm \
			-v $$(pwd):/app \
			-v ~/.gradle:/root/.gradle \
			${image_name}:latest \
			ionic cordova run android

FROM beevelop/ionic:latest

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app

# needed for ionic cordova run/build
RUN npm i -g native-run

# install all android tools
RUN yes | ${ANDROID_HOME}/tools/bin/sdkmanager "platform-tools" "platforms;android-28" "build-tools;28.0.3"

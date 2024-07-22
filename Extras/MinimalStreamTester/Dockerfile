FROM mcr.microsoft.com/windows:ltsc2019

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]

RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/v18.17.0/node-v18.17.0-win-x64.zip"; Expand-Archive nodejs.zip -DestinationPath C:\; Rename-Item "C:\\node-v18.17.0-win-x64" c:\nodejs

#RUN SETX PATH %PATH%;C:\nodejs
RUN setx /M PATH \"$Env:PATH;C:\nodejs\"

RUN npm config set registry https://registry.npmjs.org/

# Copy the signalling server and frontend source code from the build context
WORKDIR C:/tester
COPY /Extras/SoftwareStreamTester .

# Install the dependencies for the signalling server and build the frontend
RUN npm i
RUN npx playwright install --with-deps
RUN npx playwright install chrome

ENTRYPOINT [ "cmd.exe", "/C", "npx", "playwright", "test" ]

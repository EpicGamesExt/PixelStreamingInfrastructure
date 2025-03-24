# escape=`

FROM mcr.microsoft.com/windows:ltsc2019

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]

WORKDIR C:/tester
COPY NODE_VERSION .

RUN $node_version = Get-Content NODE_VERSION -Raw; `
    Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/$node_version/node-$node_version-win-x64.zip"; `
    Expand-Archive nodejs.zip -DestinationPath C:\; `
    Rename-Item "C:\node-$node_version-win-x64" c:\nodejs

RUN Set-ExecutionPolicy -ExecutionPolicy Unrestricted

RUN setx /M PATH \"$Env:PATH;C:\nodejs\"

RUN npm config set registry https://registry.npmjs.org/

# Copy the signalling server and frontend source code from the build context
COPY /Extras/MinimalStreamTester .

# Install the dependencies for the signalling server and build the frontend
RUN npm i
RUN npx playwright install --with-deps
RUN npx playwright install chrome

ENTRYPOINT [ "cmd.exe", "/C", "npx", "playwright", "test" ]

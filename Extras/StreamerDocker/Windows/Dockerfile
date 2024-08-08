# escape=`
FROM mcr.microsoft.com/windows:ltsc2019

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
RUN [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; `
   Invoke-WebRequest "https://aka.ms/vs/17/release/vc_redist.x64.exe" -OutFile "vc_redist.x64.exe"; `
   Start-Process -filepath C:\vc_redist.x64.exe -ArgumentList "/install", "/passive", "/norestart" -Passthru | Wait-Process; `
   Remove-Item -Force vc_redist.x64.exe;

ARG PROJECT_DIR=.
COPY $PROJECT_DIR /ue-project/
WORKDIR /ue-project/

ENTRYPOINT ["Minimal/Binaries/Win64/Minimal-Win64-Debug-Cmd.exe", "-warp", "-dx12", "-res=1920", "-resy=720", "-PixelStreamingEncoderCodec=VP8", "-renderoffscreen", "-AllowSoftwareRendering"]


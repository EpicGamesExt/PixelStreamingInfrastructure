@Rem Copyright Epic Games, Inc. All Rights Reserved.
@echo off
setlocal enabledelayedexpansion

title Wilbur

call :Init
call :ParseArgs %*

IF errorlevel 1 (
	exit /b 1
)

call :Setup
call :SetPublicIP
call :SetupTurnStun bg

set PEER_OPTIONS=
set SERVER_ARGS=!SERVER_ARGS! --serve --console_messages verbose --https_redirect --log_config --public_ip=!PUBLIC_IP!
IF NOT "!STUN_SERVER!"=="" (
	IF NOT "!TURN_SERVER!"=="" (
		set PEER_OPTIONS={\"iceServers\":[{\"urls\":[\"stun:!STUN_SERVER!\",\"turn:!TURN_SERVER!\"],\"username\":\"!TURN_USER!\",\"credential\":\"!TURN_PASS!\"}]}
	) ELSE (
		set PEER_OPTIONS={\"iceServers\":[{\"urls\":[\"stun:!STUN_SERVER!\"]}]}
	)
) ELSE IF NOT "!TURN_SERVER!"=="" (
	set PEER_OPTIONS={\"iceServers\":[{\"urls\":[\"turn:!TURN_SERVER!\"],\"username\":\"!TURN_USER!\",\"credentials\":\"!TURN_PASS!\"}]}
)

echo !SERVER_ARGS! | findstr /C:"--peer_options" >nul
if !errorlevel! == 0 (
	set PEER_OPTIONS_SUPPLIED=true
)
IF NOT "!PEER_OPTIONS_SUPPLIED!"=="true" (
	IF NOT "!PEER_OPTIONS!"=="" (
		set SERVER_ARGS=!SERVER_ARGS! --peer_options="!PEER_OPTIONS!"
	)
)


echo !SERVER_ARGS! | findstr /C:"--http_root" >nul
if !errorlevel! == 0 (
	set HTTP_ROOT_SUPPLIED=true
)
IF NOT "!HTTP_ROOT_SUPPLIED!"=="true" (
	IF NOT "!FRONTEND_DIR!"=="" (
		set SERVER_ARGS=!SERVER_ARGS! --http_root="!FRONTEND_DIR!"
	)
)

call :BuildWilbur
call :PrintConfig
call :StartWilbur
pause

goto :eof

REM These labels will all jump to common.bat but also jump to the label inside common.bat
:Init
:ParseArgs
:Setup
:SetPublicIP
:SetupTurnStun
:PrintConfig
:BuildWilbur
:StartWilbur
"%~dp0common.bat" %*


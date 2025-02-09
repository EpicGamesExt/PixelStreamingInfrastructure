# Wilbur

A Direct replacement for cirrus.

Wilbur is a small intermediary application that sits between streamers and other peers. It handles the initial connection negotiations and some other small ongoing control messages between peers as well as acting as a simple web server for serving the [Frontend](/Frontend/README.md) web application.

Differences of behaviour from the old cirrus are described [here](from_cirrus.md).

## Building
Building is handled by `npm` and `tsc`. However, the easiest method to install and build everything is to invoke:

```
.\SignallingWebServer\platform_scripts\cmd\start.bat --dev
```

This will install and build all the required components.

## Building manually

However, if you would like to manually build them yourself (or build other configs), you will need to:

```bash
npm install
npm run build
# Or npm run build-dev
```

In the `/common`, `/Signalling`, and `/SignallingWebServer` directories (in that order).

Each of these will output built files into the `build` or `dist` directory.

## Running
After you have build the server you can run it with both `node` directly or the `npm start` script.
```
npm start -- [arguments]
```
or
```
node build/index.js [arguments]
```
Invoking `npm start -- --help` or `node build/index.js --help` will display the configuration options.
```
Usage: node build/index.js [options]

A basic signalling server application for Unreal Engine's Pixel Streaming applications.

Options:
  -V, --version                 output the version number
  --log_folder <path>           Sets the path for the log files. (default: "logs")
  --log_level_console <level>   Sets the logging level for console messages. (choices: "debug", "info", "warning", "error", default: "info")
  --log_level_file <level>      Sets the logging level for log files. (choices: "debug", "info", "warning", "error", default: "info")
  --console_messages [detail]   Displays incoming and outgoing signalling messages on the console. (choices: "basic", "verbose", "formatted", preset: "verbose")
  --streamer_port <port>        Sets the listening port for streamer connections. (default: "8888")
  --player_port <port>          Sets the listening port for player connections. (default: "80")
  --sfu_port <port>             Sets the listening port for SFU connections. (default: "8889")
  --max_players <number>        Sets the maximum number of subscribers per streamer. (default: "0")
  --serve                       Enables the webserver on player_port. (default: true)
  --http_root <path>            Sets the path for the webserver root. (default: "D:\\PixelStreamingInfrastructure\\SignallingWebServer\\www")
  --homepage <filename>         The default html file to serve on the web server. (default: "player.html")
  --https                       Enables the webserver on https_port and enabling SSL (default: false)
  --https_port <port>           Sets the listen port for the https server. (default: 443)
  --ssl_key_path <path>         Sets the path for the SSL key file. (default: "certificates/client-key.pem")
  --ssl_cert_path <path>        Sets the path for the SSL certificate file. (default: "certificates/client-cert.pem")
  --https_redirect              Enables the redirection of connection attempts on http to https. If this is not set the webserver will only listen on https_port. Player websockets will still listen on player_port. (default: true)
  --rest_api                    Enables the rest API interface that can be accessed at <server_url>/api/api-definition (default: false)
  --peer_options <json-string>  Additional JSON data to send in peerConnectionOptions of the config message. (default: "")
  --log_config                  Will print the program configuration on startup. (default: true)
  --stdin                       Allows stdin input while running. (default: false)
  --save                        After arguments are parsed the config.json is saved with whatever arguments were specified at launch. (default: false)
  -h, --help                    Display this help text.
```
These CLI options can also be described in a `config.json` (default config file overridable with --config_file) by specifying the command option name and value in a simple JSON object. eg.
```
{
	"log_folder": "logs",
	"log_level_console": "info",
	"log_level_file": "info",
	"streamer_port": "8888",
	"player_port": "80",
	"sfu_port": "8889",
	"serve": true,
	"http_root": "www",
	"homepage": "player.html",
	"log_config": false,
	"stdin": false
}
```
Given these options, to start the server with the closest behaviour as the old cirrus, you would invoke,
```
npm start -- --console_messages --https_redirect verbose --serve --log_config --http_root Public --homepage player.html
```
Note that `Public` being used as the http root assumes your Frontend is in that directory from the old behaviour of the scripts. The new convenience scripts (`platform_scripts` directory) will now build the frontend into the `www` directory.

## Development
This implementation is built on the [Signalling](../Signalling) library which is supplied as a library for developing signalling applications. Visit its [documentation](../Signalling/docs) for more information.

### Self-signed certificates
During development it may be useful to work with self-signed SSL certificates (e.g. HTTPS is required for some features like XR and microphone usage). Self signed certificates can be generated using the following instructions:

1. Navigate to the `SignallingWebServer` directory.
2. Create a subdirectory called `certificates`.
3. Open Git Bash or your preferred shell.
4. Run `openssl req -x509 -newkey rsa:4096 -keyout client-key.pem -out client-cert.pem -sha256 -nodes`
5. Ensure your `config.json` contains:

```json
"ssl_key_path": "certificates/client-key.pem",
"ssl_cert_path": "certificates/client-cert.pem",
```

## Further Documentation
- [Protocol Messages](../Common/docs/messages.md)
- [Protocol Negotiation](../Signalling/docs/Protocol.md)


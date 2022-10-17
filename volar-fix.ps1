((Get-Content -path ("" + (gci $env:USERPROFILE/.vscode/extensions/*volar* | sort Name | select -last 1) + "/dist/node/server.js") -Raw).replace('/^\.([_a-z0-9\-]*[_a-z][_a-z0-9\-]*)/i', '/^\.([_a-z0-9\-]*[_a-z]([_a-z0-9\-\[\]\#\%]|:(?! ))*)/i')) | Set-Content -Path ("" + (gci $env:USERPROFILE/.vscode/extensions/*volar* | sort Name | select -last 1) + "/dist/node/server.js")
((Get-Content -path ("" + "node_modules/@volar/pug-language-service/node_modules/pug-lexer/index.js") -Raw).replace('/^\.([_a-z0-9\-]*[_a-z][_a-z0-9\-]*)/i', '/^\.([_a-z0-9\-]*[_a-z]([_a-z0-9\-\[\]\#\%]|:(?! ))*)/i')) | Set-Content -Path ("" + "node_modules/@volar/pug-language-service/node_modules/pug-lexer/index.js")
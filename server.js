const http = require('http');
const URL = require('url');
//
const myServer = http.createServer	(
									function (request, response) 
										{
										console.log("request.url = " + request.url);
										console.log('["/", "/favicon.ico"].includes(request.url) = ' + ["/", "/favicon.ico"].includes(request.url)); 
										console.log("");
										if (["/", "/favicon.ico"].includes(request.url))
											{
											let pageHTML =	`
															<!DOCTYPE html>
															<html>
															<head>
																<title>Test cURL</title>
															</head>
															<body>
																<p id="demo1">
															`	+
																"request.url = " + request.url +
															`
																</p>
															</body>
															</html>
															`;
											response.writeHead(200, {'Content-Type': 'text/html'});
											response.write(pageHTML);
											response.end();
											} else	{
													let theResult;
													let options =	{
																	hostname: 'jsonplaceholder.typicode.com',
																	path: '/posts',
																	method: 'GET'
																	};
													console.log("... ready to make the XHR ...");
													let req = http.request	(
																			options, 
																			(res) =>	{
																						let data = '';
																						res.on	(
																								'data', 
																								(chunk) =>	{
																											console.log("... receiving data ...");
																											data += chunk;
																											}
																								);
																						res.on	(
																								'end', 
																								() =>	{
																										console.log("... data fully received ..."); 
																										theResult = data;
																										}
																								);
																						}
																			).on	(
																					"error", 
																					(err) =>	{
																								console.log("Error in xhr: ", err);
																								theResult = "Error in xhr: " + err; 
																								}
																					).end();
													let pageHTML =	`
																	<!DOCTYPE html>
																	<html>
																	<head>
																		<title>Test cURL</title>
																	</head>
																	<body>
																		<p id="demo1">
																	` + 
																		"request.url = " + request.url + 
																	`
																		</p>
																		<p id="demo2">
																	` + 
																	theResult + 
																	`
																	</p>
																	</body>
																	</html>
																	`;
													//
													response.writeHead(200, {'Content-Type': 'text/html'});
													response.write(pageHTML);
													response.end();
													}
										}
									).listen(
											process.env.PORT,
											//3000, 
											function()
												{
												console.log("SERVER STARTED :) ");
												//console.log("SERVER STARTED PORT 3000");
												}
											);

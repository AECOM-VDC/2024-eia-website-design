let Json;
function getVisits() {
  const url = "https://cloudflare-graphql-cors.roger-luo4083.workers.dev";
  const graphql = JSON.stringify({
    query:
      'query {\r\n  viewer {\r\n    zones(filter: {zoneTag: "ec463e97a395f715f7b07df7d6fc08d3"}) {\r\n      httpRequests1dGroups(limit: 100, filter: {date_geq: "2022-05-17"}) {\r\n        uniq {\r\n          uniques\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n',
    variables: {},
  });

  fetch(url, {
    method: "POST",
    headers: {
      "x-auth-email": "eric.hsu1@aecom.com",
      "x-auth-key": "3ca28a924df6148ac967a726df605894d48e8",
      "Content-Type": "application/json",
    },
    body: graphql,
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // console.log(result);
      Json = result;
      draw();
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
}
function draw() {
  let visits = Json.data.viewer.zones[0].httpRequests1dGroups[0].uniq.uniques;
  if (visits == null || visits == "undefined" || visits == 0) {
    return;
  }
  visits = 1390 + visits;
  //add offset for uncounted records
  document.getElementById("visits").innerHTML = "Total Visitors : " + visits;
  console.log("views", visits);
}
getVisits();

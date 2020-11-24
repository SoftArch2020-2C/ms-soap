const parseString  = require("xml2js").parseString;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let asignatures = [];

let url = "http://54.198.239.79:2000/questionsrng";

const str = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ques="http://54.198.239.79:2000/questionsrng">
   <soapenv:Header/>
   <soapenv:Body>
      <ques:questions>
         <category>places</category>
      </ques:questions>
   </soapenv:Body>
</soapenv:Envelope>`;

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url, false);

  return xhr;
}

function parseXml(xml) {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function processResult(result) {
    console.log("processResult: result: ", result);
}

async function testXmlParse(xml) {
    try {


        let result = await parseXml(xml);
        // Now that you have the result you can do further processing, write to file etc.
        return result;
    } catch (err) {
        console.error("parseXml failed: ", err);
    }
}



async function getAsignatures(){
  var xhr = createCORSRequest("POST", url);
  
  if (!xhr) {
    
    throw err;
  }
  xhr.onload = function () {};

  xhr.setRequestHeader("Content-Type", "text/xml");

  xhr.send(str);

  var response = xhr.responseText;

  var res = await testXmlParse(response);

  console.log(res["soap:Envelope"]["soap:Body"][0][
      "tns:questionsResponse"
    ][0]);

  return res["soap:Envelope"]["soap:Body"][0][
      "tns:questionsResponse"
    ][0];
}

/*

async function getAsignatures() {
  
  var xhr = createCORSRequest("POST", url);
  
  if (!xhr) {
    
    throw err;
  }
  xhr.onload = function () {};

  

  xhr.setRequestHeader("Content-Type", "text/xml");

  xhr.send(str);

  var response = xhr.responseText;

  console.log(response, "error5");
  return xml2js.parseString(response, async (err, result) => {
    
    console.log(result["soap:Envelope"]["soap:Body"][0][
      "tns:questionsResponse"
    ][0]);

    return  await result["soap:Envelope"]["soap:Body"][0][
      "tns:questionsResponse"
    ][0];

    //asignatures =  result["S:Envelope"]["S:Body"][0]["ns2:questionsResponse"][0]["return"]
     
  });

  
}
*/

module.exports = {
  getAsignatures,
};

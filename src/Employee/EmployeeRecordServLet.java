package Employee;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.json.JSONObject;




import java.net.HttpURLConnection;
import java.net.URL;
/**
 * Servlet implementation class GetRecordServLet
 */
@WebServlet(
        name = "Employee",
        urlPatterns = {"/record"}
    )
public class EmployeeRecordServLet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmployeeRecordServLet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
String email=	request.getParameter("email");
String url="http://localhost:8080/records?email="+email;
		URL obj = new URL(url);
		
		HttpURLConnection http =  (HttpURLConnection) obj.openConnection();
		http.setRequestMethod("GET");
	
		int responseCode = http.getResponseCode();
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);
		BufferedReader in = new BufferedReader(
		        new InputStreamReader(http.getInputStream()));
		String inputLine="";
		StringBuffer httpresponse = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			httpresponse.append(inputLine);
		}
	PrintWriter pw=	response.getWriter();
	response.setHeader("content-type", "application/json");
		pw.write(httpresponse.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,IOException {
		// TODO Auto-generated method stub
		String url = "http://localhost:8080/records";
		 StringBuffer jb = new StringBuffer();
		 BufferedReader reader = request.getReader();
		 String line = "";
		
		 
		   
		    while ((line = reader.readLine()) != null)
		      jb.append(line);
		
		  

JSONObject j=null;

	try {
		j = new JSONObject(jb.toString());
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	String email="",start="",end="";
	try {	  
 email=		j.getString("email");
	 start=	j.getString("start");
	 end =	j.getString("end");
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

		String urlparameters="email="+email + "&start="+start + "&end="+end;
		URL obj = new URL(url);
		HttpURLConnection http =  (HttpURLConnection) obj.openConnection();
		http.setRequestMethod("POST");
		http.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(http.getOutputStream());
		wr.writeBytes(urlparameters);
		wr.flush();
		wr.close();

		int responseCode = http.getResponseCode();
		System.out.println("\nSending 'POST' request to URL : " + url);
		System.out.println("Post parameters : " + urlparameters);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(http.getInputStream()));
		String inputLine;
		StringBuffer responsebuf = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			responsebuf.append(inputLine);
		}
		in.close();
		
		//print result
		System.out.println(responsebuf.toString());
		response.setHeader("content-type", "application/json");
response.getWriter().print("{'success':'true'}");


	}

}

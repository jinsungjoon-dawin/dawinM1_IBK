package testProject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet ;

import java.sql.SQLException;

public class InsertTable {

	public static void main(String[] args) {
		Connection conn=null;
		Statement stmt=null;
		try {
			conn=DBConnection.getConnection();
			stmt=conn.createStatement(); 
	//		PreparedStatement pstmt=null;
			
			ResultSet rs=stmt.executeQuery("select * from TABLE1");  
			int rcnt=0;
			while(rs.next())  {
				System.out.println(rs.getString(1)+"  "+rs.getString(2)+"  "+rs.getString(3));  
				
			}
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if(stmt!=null)
					stmt.close();
				if(conn != null)
					conn.close();
				
			} catch(SQLException e3) {
				e3.printStackTrace();
			}
		}
/*
		try {
			String sql="INSERT INTO TEST VALUES(?, ?, ?, ?)";
			pstmt=conn.prepareStatement(sql);
			
			for(int i=0; i < 100; i++) {
				pstmt.setInt(1, i+1);
				pstmt.setString(2, "test_title"+(i+1));
				pstmt.setString(3, "test_content"+(i+1));
				pstmt.setString(4, "test_writer"+(i+1));
				
				pstmt.addBatch();		
			}
			
			pstmt.executeBatch();
			
			pstmt.clearBatch();
			
			conn.commit();
			
			
		} catch(SQLException e) {
			e.printStackTrace();
			
			try {
				conn.rollback();
			} catch(SQLException e1) {
				e1.printStackTrace();
			}
		} finally {
			try {
				if(pstmt!=null)
					pstmt.close();
				if(conn != null)
					conn.close();
				
			} catch(SQLException e3) {
				e3.printStackTrace();
			}
		}
*/		
		
		
	}

}
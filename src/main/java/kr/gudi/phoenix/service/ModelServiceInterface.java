package kr.gudi.phoenix.service;

import java.util.HashMap;

public interface ModelServiceInterface {
	public HashMap<String, Object> model(HashMap<String, Object> param);
	public HashMap<String, Object> modellist(HashMap<String, Object> param);
	/*public HashMap<String, Object> getdata();
	   public HashMap<String, Object> getdata();
	   public HashMap<String, Object> getlistData(HashMap<String, Object> param);*/
	public HashMap<String, Object> modeldetail(HashMap<String, Object> map);
	
/*	
	   public HashMap<String, Object> getData();
	   public HashMap<String, Object> getListData(HashMap<String, Object> param);*/

}

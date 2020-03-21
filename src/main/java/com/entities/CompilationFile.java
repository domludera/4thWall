package com.entities;

public class CompilationFile {
	private String fileName;
	private String fileContent;
	
	
	public CompilationFile(String fileName, String fileContent) {
		super();
		this.fileName = fileName;
		this.fileContent = fileContent;
	}
	
	public String getFileName() {
		return fileName;
	}
	
	
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public String getFileContent() {
		return fileContent;
	}
	
	public void setFileContent(String fileContent) {
		this.fileContent = fileContent;
	}
	
	@Override
	public String toString() {
		return "CompilationFile [fileName=" + fileName + ", fileContent=" + fileContent + "]";
	}

}

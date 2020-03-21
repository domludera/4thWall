package com.entities;

import java.util.List;

public class CompilationUnit {
	private String language;
	private String mainFileName;
	private List<CompilationFile> compilationFiles;
	
	public CompilationUnit(String language, String mainFileName, List<CompilationFile> compilationFiles) {
		super();
		this.language = language;
		this.mainFileName = mainFileName;
		this.compilationFiles = compilationFiles;
	}

	public String getMainFileName() {
		return mainFileName;
	}

	public void setMainFileName(String mainFileName) {
		this.mainFileName = mainFileName;
	}

	public List<CompilationFile> getCompilationFiles() {
		return compilationFiles;
	}

	public void setCompilationFiles(List<CompilationFile> compilationFiles) {
		this.compilationFiles = compilationFiles;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}	
	
	@Override
	public String toString() {
		return "CompilationUnit [language=" + language + ", mainFileName=" + mainFileName + ", compilationFiles="
				+ compilationFiles.get(0) + "]";
	}

}

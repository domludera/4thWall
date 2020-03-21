package com.compilers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;

import com.entities.CompilationFile;
import com.entities.CompilationUnit;

public abstract class AbstractCompiler {
	
	private static JavaCompiler javaCompiler = new JavaCompiler();
	
	public static AbstractCompiler createCompiler(String language)
	{
		if(language.equals("java"))
		{
			return javaCompiler;
		}
		
		return null;
	}
	
	public String compileAndRun(CompilationUnit compilationUnit, String workingDirectory) throws FileNotFoundException {
		List<CompilationFile> files = compilationUnit.getCompilationFiles();
		for(CompilationFile file : files)
		{
			PrintWriter writer = new PrintWriter(new FileOutputStream(workingDirectory + "/" +file.getFileName()));
			writer.print(file.getFileContent());
			writer.close();
		}
		compile(compilationUnit, workingDirectory);
		return run(compilationUnit, workingDirectory);
	}
	
	public static String execCmd(String[] cmd) throws IOException {
	    ProcessBuilder builder = new ProcessBuilder(cmd);
	   // builder.directory(file);
	    builder.redirectErrorStream(true);
	    Process proc = builder.start();
	    BufferedReader stdInput = new BufferedReader(new 
	    	     InputStreamReader(proc.getInputStream()));
	    String val="";
	    String line = "";
	    while((line = stdInput.readLine()) != null )
	    {
	    	val += line;

	    }
	    
	    return val;
	}
	
	protected abstract void compile(CompilationUnit compilationUnit, String workingDirectory);
	protected abstract String run(CompilationUnit compilationUnit, String workingDirectory);
}

package com.compilers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;
import java.util.concurrent.TimeUnit;

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
		String compileErr = compile(compilationUnit, workingDirectory);
		if(!compileErr.contains("error"))
		{
			return run(compilationUnit, workingDirectory);
		}
		return compileErr;
	}
	
	public static String execCmd(String[] cmd, File file) throws IOException {
	    ProcessBuilder builder = new ProcessBuilder(cmd);
	    builder.directory(file);
	    builder.redirectErrorStream(true);
	    Process proc = builder.start();
	    BufferedReader stdInput = new BufferedReader(new 
	    	     InputStreamReader(proc.getInputStream()));
	    String val="";
	    String line = "";
	    try {
			proc.waitFor(10, TimeUnit.SECONDS);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    while((line = stdInput.readLine()) != null )
	    {
	    	val += (line+ "\n");

	    }
	    
	    return val;
	}
	
	protected abstract String compile(CompilationUnit compilationUnit, String workingDirectory);
	protected abstract String run(CompilationUnit compilationUnit, String workingDirectory);
}

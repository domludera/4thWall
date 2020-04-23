package com.compilers;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.entities.CompilationFile;
import com.entities.CompilationUnit;

public class JavaCompiler extends AbstractCompiler{

	@Override
	protected String compile(CompilationUnit compilationUnit, String workingDirectory) {
		Runtime rt = Runtime.getRuntime();
		
		List<String> commandList = new ArrayList<>(); 
		List<CompilationFile> compilationFiles = compilationUnit.getCompilationFiles();
		commandList.add("javac");
		for(CompilationFile file : compilationFiles) {
			commandList.add(file.getFileName());	
		}
		String[] command = new String[commandList.size()];
		command = commandList.toArray(command);
		
		try {
			return execCmd(command, new File(workingDirectory));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}

	@Override
	protected String run(CompilationUnit compilationUnit, String workingDirectory) {
		Runtime rt = Runtime.getRuntime();
		String mainFile = compilationUnit.getMainFileName();
		String [] commands = {"java" ,"-cp", workingDirectory, mainFile.substring(0, mainFile.length() -5)};
		try {
			return execCmd(commands, new File(workingDirectory));

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}

}

package com.compilers;

import java.io.File;
import java.io.InputStream;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

import com.entities.CompilationUnit;

public class JavaCompiler extends AbstractCompiler{

	@Override
	protected void compile(CompilationUnit compilationUnit, String workingDirectory) {
		Runtime rt = Runtime.getRuntime();
		String command = "javac " + compilationUnit.getMainFileName();
		try {
			Process pr = rt.exec(command, null, new File(workingDirectory));
			pr.waitFor();
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
			return execCmd(commands);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}

}

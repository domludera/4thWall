package com.compilers;

import java.io.File;
import java.io.InputStream;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

import com.entities.CompilationUnit;

public class JavaCompiler extends AbstractCompiler{

	@Override
	protected String compile(CompilationUnit compilationUnit, String workingDirectory) {
		Runtime rt = Runtime.getRuntime();
		String[] command = {"javac", compilationUnit.getMainFileName()};
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

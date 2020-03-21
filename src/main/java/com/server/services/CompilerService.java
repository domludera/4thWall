package com.server.services;

import java.io.FileNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.compilers.AbstractCompiler;
import com.entities.CompilationUnit;

@Service("compilerService")
public class CompilerService implements ICompilerService{
	
	@Autowired
	IDirectoryService directoryService;

	@Override
	public String compileAndRun(CompilationUnit compilationUnit) {
		String workingDirectory = directoryService.getFreeTempDirectory();
		AbstractCompiler compiler = AbstractCompiler.createCompiler(compilationUnit.getLanguage());
		try {
			System.out.println("Temp Directory: " + workingDirectory);
			return compiler.compileAndRun(compilationUnit, workingDirectory);
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
		finally
		{
			directoryService.releaseTempDirectory(workingDirectory);
		}
	
	}

}

package com.server.services;

import com.entities.CompilationUnit;

public interface ICompilerService {
	public String compileAndRun(CompilationUnit compilationUnit);
}

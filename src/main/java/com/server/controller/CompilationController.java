package com.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.entities.CompilationUnit;
import com.server.services.ICompilerService;

@RestController
public class CompilationController 
{
	@Autowired
	ICompilerService compilerService;
	
	@RequestMapping(value="/compile", method=RequestMethod.POST)
	public String compileCode(@RequestBody CompilationUnit compilationUnit) {	
		return compilerService.compileAndRun(compilationUnit);
	}
}

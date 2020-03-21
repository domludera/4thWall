package com.server.services;

import org.apache.tomcat.jni.Directory;

public interface IDirectoryService {
	public String getFreeTempDirectory();
	public void releaseTempDirectory(String directory);
}

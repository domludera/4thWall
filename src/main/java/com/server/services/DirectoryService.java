package com.server.services;

import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Queue;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.stereotype.Service;

@Service("directoryService")
public class DirectoryService implements IDirectoryService{
	
	private volatile Queue<String> directoryQueue;
	private String temporaryDirectoryPath;
	private int numberOfTemporaryDirectories;

	@Override
	public synchronized String getFreeTempDirectory() {
		if(directoryQueue == null) {
			initialize();
		}
		
		if(directoryQueue.peek() == null)
		{
			doubleAmountOfFreeDirectories();
		}
		
		return directoryQueue.remove();
	}
	

	@Override
	public synchronized void releaseTempDirectory(String directory)
	{
		if(directory.contains(temporaryDirectoryPath)) {
			System.out.println("Releasing " + directory) ;
			
/*			File file = new File(directory);
			try {
				FileUtils.deleteDirectory(file);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				throw new RuntimeException("Failed to delete temp dir");
			}
			
			file.mkdir();*/
			directoryQueue.add(directory);
		}
	}
	
	private void initialize() {
		File tempDirectory = new File("./temp");
		
		if(tempDirectory.exists())
		{
			try {
				FileUtils.deleteDirectory(tempDirectory);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				throw new RuntimeException("Failed to delete temp dir");
			}
		}
		
		boolean success = tempDirectory.mkdir();
		tempDirectory.deleteOnExit();
		if(!success) throw new RuntimeException("Failed to Create Directory");
		
		temporaryDirectoryPath = tempDirectory.getAbsolutePath().replace(".\\", "");
		numberOfTemporaryDirectories = 5;
		directoryQueue = new LinkedList<String>();
		
		for(int i = 0; i<numberOfTemporaryDirectories; i++) {
			File file = new File(temporaryDirectoryPath + "/temp" + i);
			file.mkdir();
			file.deleteOnExit();
			directoryQueue.add(file.getAbsolutePath());
		}
	}
	
	private void doubleAmountOfFreeDirectories() {
		int i = numberOfTemporaryDirectories;
		numberOfTemporaryDirectories *= 2;
		
		while(i < numberOfTemporaryDirectories) {
			
			i++;
		}
	}

}

package com.cms.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.dao.BlogDao;
import com.cms.dao.UserDao;
import com.cms.dto.BlogDto;
import com.cms.models.Blog;
import com.cms.models.User;

@Service
public class BlogServiceImpl implements BlogService {
	
	@Autowired
	private BlogDao bdao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private UserDao udao;

	@Override
	public String saveBlog(BlogDto blog) {
		
		System.out.println(blog.toString());
		User user = udao.findById(blog.getUserId()).orElse(null);
		System.out.println(user);
		
		if(user != null) {
			Blog mappedBlog = mapper.map(blog, Blog.class);
			mappedBlog.setUpdated_timestamp(LocalDateTime.now());
			
			mappedBlog.setUser(user);
			try {
				bdao.save(mappedBlog);
				return "Blog Added";
			}
			catch(Exception e) {
				return "Blog not added";
			}
		}
		else {
			return "User not found";
		}
	}

	@Override
	public List<Blog> showBlogs() {
		
		return bdao.findAll();
	}

	@Override
	public List<BlogDto> getTopBlogs() {
		
		List<Blog> blogs =  bdao.findAll();
		List<BlogDto> blogDs = new ArrayList<>();
		
		for(Blog b : blogs) {
			BlogDto blogDto = mapper.map(b, BlogDto.class);
			blogDs.add(blogDto);
		}
		
		List<BlogDto> topBlogs = new ArrayList<>();

		for (BlogDto blog : blogDs) {
		    if ("top".equals(blog.getCategory())) {
		        topBlogs.add(blog);
		    }
		}
		
		return topBlogs;
	}
	
	
	
}

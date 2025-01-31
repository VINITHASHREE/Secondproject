package com.second.CollaborationBack.DAO;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.second.CollaborationBack.model.Blog;




public class BlogDAOImpl implements BlogDAO {
	
	@Autowired
	private SessionFactory sessionFactory;

	public BlogDAOImpl(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	
	@Transactional
	public List<Blog> list() {
		@SuppressWarnings({ "unchecked" })
		List<Blog> listBlog = (List<Blog>) sessionFactory.getCurrentSession().createCriteria(Blog.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();
		return listBlog;
	}

 
	@Transactional
	public void delete(int bid) {
		Blog blogToDelete = new Blog();
		blogToDelete.setBid(bid);
		sessionFactory.getCurrentSession().delete(blogToDelete);

	}		
	
	@Transactional
	public Blog get(int bid) {
		String hql = "from Blog where bid ='" + bid + "'";
		org.hibernate.Query query = sessionFactory.getCurrentSession().createQuery(hql);
		@SuppressWarnings("unchecked")
		List<Blog> listBlog = (List<Blog>) query.list();

		if (listBlog != null && !listBlog.isEmpty()) {
			return listBlog.get(0);
		}
		return null;		
	}

	@Transactional
	public Blog saveOrUpdate(Blog blog) {
		sessionFactory.getCurrentSession().saveOrUpdate(blog);
		return blog;
		
	}
 

}

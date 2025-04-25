import React from "react";
import "./style.css"; // optional for custom styles
import img1 from "../assets/img1.webp"
// import blog1 from "../assets/blog2.jpg"
// import blog2 from "../assets/blog2.jpg"
// import blog3 from "../assets/blog2.jpg"


const blogData = [
  {
    title: " Simple Ways to Stay Fit at Home",
    // summary: "Learn how to maintain your fitness without going to the gym.",
    image: img1,
    date: "April 15, 2025",
  },
  {
    title: "Why Personal Fitness Plans Help More",
    // summary: "Discover the benefits of fitness plans tailored to you.",
    image: img1,
    date: "April 20, 2025",
  },
  {
    title: "How Our System Predicts the Right Fitness Plan",
    // summary: "What you eat after your workout is crucial. Here's what to know.",
    image: img1,
    date: "April 25, 2025",
  },
];

function BlogSection() {
  return (
    <section className="blog-section container my-5">
      <h2 className="text-center mb-4">📚 Fitness Blogs</h2>
      <div className="row">
        {blogData.map((blog, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow blog-card">
              <img src={blog.image} className="card-img-top" 
               style={{ height: "260px", objectFit: "cover" }}
              alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
               <p><small className="text-muted">{blog.date}</small></p> 
                {/* <p className="card-text mt-2">{blog.summary}</p> */}
                <a href="#" className="btn btn-outline-primary btn-sm">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;

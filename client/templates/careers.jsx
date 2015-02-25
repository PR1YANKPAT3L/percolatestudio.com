Careers = React.createClass({
  mixins: [MetaTagsMixin],

  componentWillMount: function() {
    this.setTitle("Join Us | Percolate Studio");
    this.setDescription("Join our team to solve diverse challenges with great people. We’ll push you to do the best work of your career, we ask that you push us to do the same.");
  },

  render: function() {
    var jobLinks = this.props.collections.Jobs.find().map(function(job) {
      return <Opening job={job} key={job._id}/>;
    });

    var internLinks = this.props.collections.Interns.find().map(function(intern) {
      return <Opening job={intern} key={intern._id}/>;
    });

    return (
      <PageLayout {...this.props}>
        <header className="collage medium">
          <div className="grid-2-square">
            <h1 className="title-page">Join us</h1>
            <p className="description-page">Solve diverse challenges with great people. We’ll push you to do the best work of your career, we ask that you push us to do the same.</p>
          </div>
          <div className="grid-2-square bg-image-careers"></div>
        </header>

        <section className="section-lookfor">
          <h2 className="title-section">Our DNA</h2>
          <div className="grid-3 subsection">
            <img alt="Nimble" src="/img/characteristics-nimble-160x160.svg"/>
            <div className="meta">
              <h3 className="subtitle-section">Nimble</h3>
              <p>We believe in small teams that can imagine and build products from the ground up.</p>
            </div>
          </div>
          <div className="grid-3 subsection">
            <img alt="Curious" src="/img/characteristics-curious-160x160.svg"/>
            <div className="meta">
              <h3 className="subtitle-section">Curious</h3>
              <p>We're curious how technology can make everyday experiences easier and more delightful.</p>
            </div>
          </div>
          <div className="grid-3 subsection">
            <img alt="Collaborative" src="/img/characteristics-people-160x160.svg"/>
            <div className="meta">
              <h3 className="subtitle-section">Collaborative</h3>
              <p>We understand that great products begin with motivated, collaborative, and happy teams.</p>
            </div>
          </div>
        </section>

        <section className="section-openings">
          <h2 className="title-section">Openings</h2>
          <div className="grid-2 openings">
            <p className="subtitle-openings"><b>Team members</b> create the future of design & technology.</p>
            {jobLinks}
          </div>
          <div className="grid-2 openings">
            <p className="subtitle-openings"><b>Interns</b> get hands-on experience launching products.</p>
            {internLinks}
          </div>
        </section>
      </PageLayout>
    );
  }
});

var Opening = React.createClass({
  render: function() {
    var job = this.props.job;
    return (
      <div className="opening">
        <Router.Link to="job" params={job} className="title-opening">{job.title}</Router.Link>
          <span className="location-opening">({job.locations})</span>
        <p className="description-opening">{job.description}</p>
      </div>
    );
  }
})
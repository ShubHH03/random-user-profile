function ProfileCard({ user }) {
  const { name, picture, email, phone, dob, location } = user;

  const fullName = `${name.title}. ${name.first} ${name.last}`;

  return (
    <div className="card">
      {/* Banner + Avatar */}
      <div className="card__header">
        <img className="card__avatar" src={picture.large} alt={fullName} />
      </div>

      {/* Name & Age */}
      <div className="card__identity">
        <h2 className="card__name">{fullName}</h2>
        <span className="card__age-pill">{dob.age} yrs</span>
      </div>

      {/* Info rows */}
      <div className="card__body">
        <div className="card__info-row">
          <span className="card__info-icon">✉</span>
          <div className="card__info-content">
            <span className="card__info-label">Email</span>
            <a
              href={`mailto:${email}`}
              className="card__info-value card__info-value--link"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="card__info-row">
          <span className="card__info-icon">📞</span>
          <div className="card__info-content">
            <span className="card__info-label">Phone</span>
            <span className="card__info-value">{phone}</span>
          </div>
        </div>

        <div className="card__info-row">
          <span className="card__info-icon">📍</span>
          <div className="card__info-content">
            <span className="card__info-label">Location</span>
            <span className="card__info-value">
              {location.state}, {location.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

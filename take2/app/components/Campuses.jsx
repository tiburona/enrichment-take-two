import React from 'react';



const Campuses = (props) => {
	const campuses = props.campuses;
	const selectCampus = props.clickCampus
	const deleteCampus = props.deleteCampus

	return (
		<div>
			<h3>Campuses</h3>
			{
				campuses.map((campus, idx) => {
					let imgSrc = `/images/${campus.name}.png`
					
					
					return (
						<div className="col-xs-4" key={idx}>
							<a className="thumbnail" href="#" onClick={() => selectCampus(campus.id)}>
								<img src={imgSrc} />
								<div className="caption">
									<h5>
										<span>{campus.name}</span>

									</h5>
								</div>
							</a>
							<button className="btn btn-danger btn-xs" onClick={() => { deleteCampus(campus.id) }}>
									<span className="glyphicon glyphicon-trash"> Delete</span>
								</button>
						</div>)
				}
				)
			}
		</div>
	)
}

export default Campuses

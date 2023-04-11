import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTable } from '../../actions/auth';
import { withRouter } from 'react-router-dom';

const Table = ({ tableNum, setTable, history }) => {
	const [formData, setFormData] = useState(tableNum);

	const onChange = (e) => {
		setFormData(e.target.value);
	};

	const onSubmit = (e) => {
		setTable(formData);
		history.push('/catalog');
	};

	return (
		<Fragment>
			<h1 className='head-center'>Table Number</h1>
			<form className='form form-table' onSubmit={onSubmit}>
				<input onChange={onChange} value={formData} type='number' min='0' />

				<button className='btn btn-light'>
					<i className='fas fa-chevron-right' style={{ fontSize: '1.5em' }}></i>
				</button>
			</form>

			{/* <div className='table-numbers'>
				<div className='tableNum'>1</div>
				<div className='tableNum'>2</div>
				<div className='tableNum'>3</div>
				<div className='tableNum'>5</div>
				<div className='tableNum'>6</div>
				<div className='tableNum'>7</div>
				<div className='tableNum'>8</div>
				<div className='tableNum'>9</div>
				<div className='tableNum'>10</div>
				<div className='tableNum'>11</div>
				<div className='tableNum'>12</div>
				<div className='tableNum'>13</div>
				<div className='tableNum'>14</div>
				<div className='tableNum'>15</div>
			</div> */}
		</Fragment>
	);
};

Table.propTypes = {
	tableNum: PropTypes.string.isRequired,
	setTable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ tableNum: state.auth.tableNum });

export default connect(mapStateToProps, { setTable })(withRouter(Table));

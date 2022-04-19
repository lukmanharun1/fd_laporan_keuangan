import React from 'react';
import propTypes from 'prop-types';

export default function Table(props) {
  const { dataThead, classThead, classTbody, classTable, classTr, classTh, children } = props;
  return (
    <table className={classTable}>
      <thead className={classThead}>
        <tr className={classTr}>
          {
            dataThead.map((data, i)  => <th className={classTh} key={i}>{data}</th>)
          }
        </tr>
      </thead>
      <tbody className={classTbody}>
        {children}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  dataThead: propTypes.array,
  classTable: propTypes.string,
  classThead: propTypes.string,
  classTbody: propTypes.string,
  classTr: propTypes.string,
  classTh: propTypes.string,
  classTd: propTypes.string  
}
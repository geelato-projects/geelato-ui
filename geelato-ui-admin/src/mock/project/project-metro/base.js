let data = {}
data.projectGroups = [
  {name: '轨道交通一号线', shortName: '一号线', code: 'L011', projects: []},
  {name: '轨道交通二号线', shortName: '二号线', code: 'L021', projects: []},
  {
    name: '轨道交通三号线',
    shortName: '三号线',
    code: 'L031',
    projects: [],
    points: [
      {lng: 108.277708, lat: 22.884344},
      {lng: 108.290643, lat: 22.884344},
      {lng: 108.304585, lat: 22.885209},
      {lng: 108.316658, lat: 22.886275},
      {lng: 108.322407, lat: 22.881747},
      {lng: 108.334193, lat: 22.884543},
      {lng: 108.34526, lat: 22.882812},
      {lng: 108.352016, lat: 22.876819},
      {lng: 108.354243, lat: 22.876619},
      {lng: 108.361502, lat: 22.876752},
      {lng: 108.363226, lat: 22.87542},
      {lng: 108.362508, lat: 22.862633},
      {lng: 108.362364, lat: 22.851244},
      {lng: 108.362292, lat: 22.842318},
      {lng: 108.362508, lat: 22.840386},
      {lng: 108.366173, lat: 22.83619},
      {lng: 108.37918, lat: 22.829195},
      {lng: 108.377743, lat: 22.825864},
      {lng: 108.377887, lat: 22.819468},
      {lng: 108.37803, lat: 22.817203},
      {lng: 108.374006, lat: 22.813872},
      {lng: 108.368544, lat: 22.808675},
      {lng: 108.375587, lat: 22.798947},
      {lng: 108.374868, lat: 22.796681},
      {lng: 108.382917, lat: 22.789351},
      {lng: 108.382486, lat: 22.780955},
      {lng: 108.382702, lat: 22.773957},
      {lng: 108.383564, lat: 22.764426},
      {lng: 108.384858, lat: 22.76296},
      {lng: 108.388451, lat: 22.759294},
      {lng: 108.389673, lat: 22.756828},
      {lng: 108.390391, lat: 22.753895},
      {lng: 108.390463, lat: 22.751162},
      {lng: 108.390319, lat: 22.745163},
      {lng: 108.390391, lat: 22.73303}],
    schedulePoints: {
      red: [{lng: 108.362508, lat: 22.862633},
        {lng: 108.362364, lat: 22.851244},
        {lng: 108.362292, lat: 22.842318},
        {lng: 108.362508, lat: 22.840386},
        {lng: 108.366173, lat: 22.83619},
        {lng: 108.37918, lat: 22.829195},
        {lng: 108.377743, lat: 22.825864}]
    }
  },
  {name: '轨道交通四号线', shortName: '四号线', code: 'L041', projects: []},
  {name: '轨道交通一号线二期', shortName: '四号线', code: 'L012', projects: []}
]

data.workPoints = [
  {name: '火车站', lng: 108.361502, lat: 22.876752, color: 'blue', type: 'station'},
  {name: '达道站', lng: 108.390463, lat: 22.751162, color: 'red', type: 'station'}
]

export default data

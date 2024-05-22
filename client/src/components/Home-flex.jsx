import '../styles/Home-flex.css'

const flexCard = ({dbfoimg, dbforole, dbfoposcnt, dbfoposcnt2}) => (
    <div class="dbf4-roles-card">
        <div class="dbf4-role-img">
            <img src={dbfoimg} alt="role-img" />
        </div>
        <div class="dbf4-role-details">
            <div class="dbf4-role-name">
                <span class="dbf4-name-txt">{dbforole}</span>
            </div>
            <div class="dbf4-pos-cnt">
                <span class="dbf4-pos-txt">{dbfoposcnt}</span>
                <span class="dbf4-pos-txt2">{dbfoposcnt2}</span>
            </div>
        </div>
  </div>

);

export default flexCard;
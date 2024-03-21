import './HorseProfileData.scss'

export default function HorseProfileData({ data }) {

    const {
        born,
        sex,
        bodyType,
        weight,
        walkTime,
        trotTime
    } = data

    let modifiedBodyType = bodyType.split("-")[1]

    return (
        <section className="profile-content">
            <ul>
                <li><span>Born:</span> {born}</li>
                <li><span>Gender:</span>{sex}</li>
                <li><span>Body Type:</span> {modifiedBodyType}</li>
                <li><span>Weight:</span> {weight} kg</li>
            </ul>
            <div>
                <h4>Workamount </h4>
                <span>Work load in minutes per day</span>
                <ul>
                    <li><span>Walk:</span> {walkTime} min</li>
                    <li><span>Trot / Canter:</span> {trotTime} min</li>
                </ul>
            </div>
        </section>
    )
}

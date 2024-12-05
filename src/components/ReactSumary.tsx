import StarRatings from 'react-star-ratings';

function RatingSummary() {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                4.6
                <StarRatings
                    rating={4.6}
                    starRatedColor="#FFA726"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="3px"
                />
            </div>
            <p>(20 đánh giá)</p>
        </div>
    );
}

export default RatingSummary;

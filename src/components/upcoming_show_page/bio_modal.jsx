// React Imports
import React, { useState } from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

// Component Imports 
import FestivalBio from "./festival_bio";
import ApiCalendar from 'react-google-calendar-api';


const bioModal = ({ days_left, artist_name, concert_name, img, price, weekday, date, time, description, width, formated_date }) => {
    const toBeImplemented = async() => {
        await ApiCalendar.handleAuthClick()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
            
        addEvent();
            // .then((result) => {
            //     console.log(result);
            //     addEvent();
            // })
            // .catch((error) => {
            //     console.log(error);
            // });
    };

    const addEvent = () => {

        const eventLoad = {
            summary: artist_name + "-" + concert_name,
            description: "onfour concert!",
            start: {
                dateTime: new Date(formated_date).toISOString()
            },
            end: {
                dateTime: new Date(new Date(formated_date).getTime() + 90 * 60000).toISOString()
            }
        };

        ApiCalendar.createEvent(eventLoad)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="modal-container">
            {width > 600 ? (
                <Grid className="modal-container">
                    {artist_name != "Justice Speaks" ? (
                        <Row className="modal-container">
                            <Col size={4} className="modal-description-col">
                                <Row>
                                    <div className="modal-date">IN {days_left} DAYS</div>
                                </Row>
                                <Row>
                                    <div className="modal-bio-title">{artist_name.toUpperCase()} - {concert_name.toUpperCase()}
                                    </div>
                                </Row>
                                <Row className="modal-description-container">
                                    <div className="modal-bio-description">
                                        {description}
                                    </div>
                                </Row>
                            </Col>
                            <Col size={2} className="modal-info-col">
                                <Row>
                                    <div className="modal-image-container">
                                        <img className="modal-bio-image" src={img} alt="artist-img"></img>
                                    </div>
                                </Row>
                                <Row className="modal-info-row first-row">
                                    <a className="modal-info" href="https://www.onfour.live/stream">
                                        https://www.onfour.live/stream
                                     </a>
                                </Row>
                                <Row className="modal-info-row">
                                    <div className="modal-info">{weekday.toUpperCase()}, {date}</div>
                                </Row>
                                <Row className="modal-info-row last-row">
                                    <div className="modal-info">{time} EST</div>
                                </Row>
                                <Row className="modal-ticket">
                                    {price ? (
                                        <button className="modal-ticket-button" id="buy_ticket">BUY TICKET</button>
                                    ) : (
                                        // <button className="modal-free-button" id="free" onClick={toBeImplemented}>FREE</button>
                                        <div className="modal-free-button" onClick={toBeImplemented}>RSVP</div>
                                        )}
                                </Row>
                            </Col>
                        </Row>
                    ) : (
                            <Row className="modal-container">
                                <Col size={4} className="modal-description-col">
                                    <Row>
                                        <div className="modal-date">IN {days_left} DAYS</div>
                                    </Row>
                                    <Row>
                                        <div className="modal-bio-title">{artist_name.toUpperCase()}: A Festival for Queer and Trans Black Lives - {concert_name.toUpperCase()}
                                        </div>
                                    </Row>
                                    <Row className="modal-description-container">
                                        {concert_name === "Part III" ? (
                                            <div className="festival-bio-description">
                                                <div className="disclaimer">
                                                    {"ALL PROCEEDS WILL BE SPLIT 50/50 BETWEEN THE FOR THE GWORLS & LGBTQ FREEDOM FUND "}
                                                </div>
                                                <a href="https://www.justicespeaks.info/the-cause" target="_blank">learn more about both organizations</a>
                                                <div className="line-up">
                                                    {"\n"}LINE UP
                                                </div>
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/achille.png"}
                                                    name={"Achille Tenkiang"}
                                                    bio={"Achille Tenkiang is an aspiring attorney and creative passionate about connecting and equipping people with the tools and resources they need to advocate for Black Lives. A multitalented performer, Tenkiang is a proud alumnus of Princeton University’s Ellipses Slam Poetry Team and Umqombothi African Music Ensemble. While living in Nairobi, he organized a series of slam poetry workshops with urban refugee youth. And while living in Paris last year, he continued his creative pursuits, starring in Loline Stage and Film’s production of Katori Hall’s award-winning play \"The Mountaintop.\""}
                                                    num={1}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/amina.png"}
                                                    name={"Amina Iro"}
                                                    bio={"Amina Iro, raised in Prince Georges County, MD, holds a B.S. from UW-Madison in Neurobiology and English Creative Writing. Amina has performed in venues including the John F. Kennedy Center for Performing Arts, the Washington Convention Center, the Auditorium Theatre in Chicago, IL, and the State Theatre in Tshwane, South Africa. She is a 2020/2021 Brooklyn Poets Hampton Retreat Fellow. Amina's work can be found in Beltway Poetry Quarterly and Dreginald."}
                                                    num={11}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Anjali+Taneja.jpg"}
                                                    name={"Anjali Taneja"}
                                                    bio={"Listening to Anjali Taneja, it’s easy to hear how she seamlessly blends soulful beats with silken vocal textures fueled by an upbringing in South Asian classical music and R&B. Anjali has performed as an Artist-in-Residence at Strathmore Music Center, Kennedy Center Millennium Stage, Terminal 5 (NYC), Union Stage, Rockwood Music Hall (NYC), the Hamilton among several others, and most recently toured with Red Baraat on the northeast leg of their \"Festival of Colors\" tour. Her upcoming EP is slated for release this summer, and explores themes of identity, culture, and introspection in the eyes of a young woman."}
                                                    num={2}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Ben+Barron.jpg"}
                                                    name={"Ben Barron"}
                                                    bio={"Ben Barron is a musician, film producer, and environmental activist based in Boulder, Colorado. He plays banjo, guitar, and sings in the indie folk quartet The Infamous Flapjack Affair. Learn more about their award-winning film Confluence, which follows the band on a journey through the national parks and monuments of the Colorado River basin, by visiting confluencethejourney.com"}
                                                    num={3}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Calvin+Wentling.jpg"}
                                                    name={"Calvin Wentling"}
                                                    bio={"Calvin Wentling is a vocalist and educator from New York City. Calvin graduated from Princeton University in 2018 with a BA in Music and certificate in African Studies. At Princeton, Calvin sang with the Glee Club and Chamber Choir as well as serving as the Music Director of the Nassoons. Calvin now teaches Music Theory at his alma mater The Saint Thomas Choir School and sings professionally with various choirs in NYC."}
                                                    num={4}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/jenna.png"}
                                                    name={"Jenna Putnam"}
                                                    bio={"Jenna Putnam is a writer, poet, musician, and visual artist living and working in Los Angeles. She likes long walks down dark crooked streets, Arthur Russel, and tasteful nudes."}
                                                    num={5}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Julia+Danitz.jpeg"}
                                                    name={"Julia Danitz"}
                                                    bio={"Julia Danitz, violinist and composer, enjoys a multifaceted and diverse musical career. She has had the pleasure of working in different types concert venues, from playing in ensembles and as soloist at Carnegie Hall and Lincoln Center to the TV set of The Late Show with Stephen Colbert, Live From Here with Chris Thile, and the Barclays Center arena. Trained as a classical violinist, Julia is a graduate of the Juilliard School with a Masters of Music in violin performance and also holds a B.A. in Political Science with a concentration in Business Management from Columbia University. She has had the privilege of working alongside iconic musicians such as Yo-Yo Ma and the Silk Road Ensemble, Chris Thile, Jon Batiste, and more. She is currently pursuing a Doctorate of Musical Arts at the Graduate Center of City University of New York  (CUNY). "}
                                                    num={6}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Katie+and+Jerem%C3%ADas.jpg"}
                                                    name={"Jeremías Sergiani-Velázquez & Katie Althen"}
                                                    bio={"Argentine violinist Jeremías Sergiani-Velázquez and American flutist Katie Althen have presented duo recitals in the U.S. and South America. Katie is known to a wide audience for her contributions to the flute community on Instagram and YouTube as @katieflute, where she has amassed over 85,000 followers and subscribers, as well as over 4,000,000 views. Jeremías has been a member of the Pittsburgh Symphony Orchestra since 2019. Katie and Jeremías are both graduates of The Juilliard School and the New England Conservatory."}
                                                    num={7}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Kovey+Coles.png"}
                                                    name={"Kovey Coles"}
                                                    bio={"Kovey Coles is a rapper/instrumentalist whose guitar-driven songs blend soulful and indie rock vibes into hip-hop. He is currently based in Los Angeles, and you can find his newest release 'TTST' available on all platforms now."}
                                                    num={8}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Malachi+Bird.jpg"}
                                                    name={"MalPractice"}
                                                    bio={"Hailing from Northeast, D.C., Chocolate City’s own MalPractice is trying to give rap a seat at the table. The Inaugural DC Youth Poet Laureate has published three books, four mixtapes, and is the founder of the Crowning Too Early Scholarship Fund. Among the first ever cohort of Black men to receive African-American Studies degrees from Princeton University, MalPrac has always been propelled by love for his city and love for language. He has shared stages with artists such as Talib Kweli, The Last Poets, Chuck Brown, Vic Mensa, A Boogie Wit Da Hoodie, and many more incredible artists. His favorite quote is “Without art, the Earth is just Eh,” and he goes by Practice because he knows that he’ll never be perfect enough."}
                                                    num={9}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Sam+Gravitte.jpg"}
                                                    name={"Sam Gravitte"}
                                                    bio={"Sam is primarily an actor.  A veteran of the Broadway musicals Wicked and Almost Famous, he is an aspiring writer, a burgeoning Marxist, and a player of the guitar, piano, and sax (in descending order of capability). "}
                                                    num={10}
                                                />
                                            </div>
                                        ) : (
                                                <div className="festival-bio-description">
                                                    <div className="disclaimer">
                                                        {"ALL PROCEEDS WILL BE SPLIT 50/50 BETWEEN THE FOR THE GWORLS & LGBTQ FREEDOM FUND "}
                                                    </div>
                                                    <a href="https://www.justicespeaks.info/the-cause" target="_blank">learn more about both organizations</a>
                                                    <div className="line-up">
                                                        {"\n"}LINE UP
                                                    </div>
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/achille.png"}
                                                        name={"Achille Tenkiang"}
                                                        bio={"Achille Tenkiang is an aspiring attorney and creative passionate about connecting and equipping people with the tools and resources they need to advocate for Black Lives. A multitalented performer, Tenkiang is a proud alumnus of Princeton University’s Ellipses Slam Poetry Team and Umqombothi African Music Ensemble. While living in Nairobi, he organized a series of slam poetry workshops with urban refugee youth. And while living in Paris last year, he continued his creative pursuits, starring in Loline Stage and Film’s production of Katori Hall’s award-winning play \"The Mountaintop.\""}
                                                        num={1}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/alex.png"}
                                                        name={"Alex Brunson"}
                                                        bio={"Since moving to New York in 2017, Alex has had the pleasure of performing venues across New York, D.C. and along the east coast, as well as internationally with his indie r&b duo, bluesoul. bluesoul comprises Alex on keys and vocals and his good friend Sid Gopinath on guitar and vocals. You can keep up with bluesoul on their instagram, find their debut EP on all streaming platforms, and check out their live work on YouTube."}
                                                        num={9}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Aryeh+Nussbaum+Cohen.jpg"}
                                                        name={"Aryeh Nussbaum Cohen"}
                                                        bio={"Acclaimed as a \"young star\" and \"complete artist\" by the New York Times and \"extravagantly gifted... poised to redefine what’s possible for singers of this distinctive voice type\" by the San Francisco Chronicle, countertenor Aryeh Nussbaum Cohen is one of the classical vocal world's most promising rising stars. Aryeh's first commercial recording - the world premiere recording of Kenneth Fuchs' Poems of Life with the London Symphony Orchestra - won a 2019 GRAMMY® Award in the Best Classical Compendium category. His numerous awards include Grand Finals Winner of the Metropolitan Opera National Council Auditions and Third Prize in Operalia 2019 in Prague, the only American to place in the international competition. Aryeh's performance credits include productions with San Francisco Opera, Theater an der Wien, Houston Grand Opera, Cincinnati Opera and San Francisco Ballet, and concert engagements with the San Francisco Symphony, Philharmonia Baroque Orchestra, the Buffalo Philharmonic and American Bach Soloists; his upcoming engagements will take him to many of the world’s leading opera houses, across Europe and the United States. He is proud to stand in support of the Black Lives Matter Movement."}
                                                        num={2}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/crystal.png"}
                                                        name={"Crystal Valentine"}
                                                        bio={"Born and raised in the Bronx, Crystal Valentine is a nationally and internationally acclaimed poet. Crystal has traveled across seas performing on platforms in Paris, Brazil, Botswana, South Africa and elsewhere. She was named Glamour Magazine's 2016 College Woman of the Year, Teen Vogue's Rising Young Black Thought Leader, and was the recipient of the National Conference of College Women Student Leaders Woman’s Distinction Award. A Callaloo Fellow and former New York City Youth Poet Laureate, Crystal’s work has been featured on programming for MSNBC, Blavity, Button Poetry, BET, CNN, The New York Daily News and more. She earned her B.A in Psychology at New York University, where she is returning as a MFA candidate in Poetry. She is a coordinator for the Bronx Council on the Arts and is the current Wednesday Night host at the Nuyorican Poets Café."}
                                                        num={3}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Dani+Stephenson.jpg"}
                                                        name={"Dani Stephenson"}
                                                        bio={"Dani is a 20-year old musician, singer, and songwriter who was born in Birmingham, Alabama and grew up in Guam, USA. Classically trained in music since she was five years old and a Jazz Studies minor, Dani only began writing her own music halfway through college. Her recent EP, Water Signs (available on all major streaming platforms) fuses low-slung hip hop beats, jazz-inspired melodies, and intimately vulnerable lyrics into a distinct, soulful sound. She is a class of 2020 graduate of Princeton University and will be based in Los Angeles this fall."}
                                                        num={4}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Saunghee+and+Mike.jpg"}
                                                        name={"Delgado & Ko"}
                                                        bio={"Delgado & Ko are an electro-acoustic duo based in New York City. While both have their respective backgrounds in jazz guitar and classical singing, they first started performing popular music together in the funk-afrobeat collective Sensemaya at Princeton. Since then they have started performing regularly in NYC, both as a duo and alongside other musicians and bands, and have expanded their repertoire to include funk, pop, soul, and everything in between."}
                                                        num={10}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Emily+Miller.jpeg"}
                                                        name={"Emily Miller"}
                                                        bio={"Emily spent her time in college in a variety of music groups singing jazz, funk, and pop music. Most recently she’s been active in the soul/folk group \"Baby Dreams.\""}
                                                        num={5}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Kovey+Coles.png"}
                                                        name={"Kovey Coles"}
                                                        bio={"Kovey Coles is a rapper/instrumentalist whose guitar-driven songs blend soulful and indie rock vibes into hip-hop. He is currently based in Los Angeles, and you can find his newest release 'TTST' available on all platforms now."}
                                                        num={6}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Malachi+Bird.jpg"}
                                                        name={"MalPractice"}
                                                        bio={"Hailing from Northeast, D.C., Chocolate City’s own MalPractice is trying to give rap a seat at the table. The Inaugural DC Youth Poet Laureate has published three books, four mixtapes, and is the founder of the Crowning Too Early Scholarship Fund. Among the first ever cohort of Black men to receive African-American Studies degrees from Princeton University, MalPrac has always been propelled by love for his city and love for language. He has shared stages with artists such as Talib Kweli, The Last Poets, Chuck Brown, Vic Mensa, A Boogie Wit Da Hoodie, and many more incredible artists. His favorite quote is “Without art, the Earth is just Eh,” and he goes by Practice because he knows that he’ll never be perfect enough."}
                                                        num={7}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/tanya.png"}
                                                        name={"Tanyaradzwa Tawengwa"}
                                                        bio={"Professor Tanyaradzwa Tawengwa is a Zimbabwean Gwenyambira, composer and singer whose storytelling serves to bridge Zimbabwe's past and present, in order to inform a self-crafted future. Her craft lives at the intersection of music and healing, drawing from the generations of Svikiro (spirit mediums) and N'anga (healers) in her bloodline. Tawengwa is also the founder and music director of the Mushandirapamwe Singers, a Zimbabwean vocal ensemble. Tawengwa earned her B.A. in Music Composition at Princeton University (cum laude), her M.M. in Voice Performance from the University of Kentucky and is currently a doctoral candidate in Voice Performance at the University of Kentucky.\nhttps://www.mushandirapamwe-singers.com/bio"}
                                                        num={8}
                                                    />
                                                </div>
                                            )}
                                    </Row>
                                </Col>
                                <Col size={2} className="modal-info-col">
                                    <Row>
                                        <div className="modal-image-container">
                                            <img className="modal-bio-image" src={img} alt="artist-img"></img>
                                        </div>
                                    </Row>
                                    <Row className="modal-info-row first-row">
                                        <a className="modal-info" href="https://www.onfour.live/stream">
                                            https://www.onfour.live/stream
                                        </a>
                                    </Row>
                                    <Row className="modal-info-row">
                                        <div className="modal-info">{weekday.toUpperCase()}, {date}</div>
                                    </Row>
                                    <Row className="modal-info-row last-row">
                                        <div className="modal-info">{time} EST</div>
                                    </Row>
                                    <Row className="modal-ticket">
                                        {price ? (
                                            <button className="modal-ticket-button" value="buy_ticket">BUY TICKET</button>
                                        ) : (
                                                // <button className="modal-free-button" value="free">FREE</button>
                                                <div className="modal-free-button">FREE</div>
                                            )}

                                    </Row>
                                </Col>
                            </Row>
                        )}
                </Grid>
            ) : (
                <Grid>
                    {artist_name != "Justice Speaks" ? (
                        <Row>
                            <Col className="modal-description-col mobile">
                                <Row>
                                    <div className="mobile-modal-image-container">
                                        <img className="modal-bio-image" src={img} alt="artist-img"></img>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="modal-date">IN {days_left} DAYS</div>
                                </Row>
                                <Row>
                                    <div className="modal-bio-title">{artist_name.toUpperCase()} - {concert_name.toUpperCase()}
                                    </div>
                                </Row>
                                <Row>
                                    <div className="mobile-modal-info">{weekday.toUpperCase()} | {date} | {time} EST</div>
                                </Row>
                                <Row>
                                    <div className="mobile-modal-bio-description">
                                        {description}
                                    </div>
                                </Row>
                            </Col> 
                        </Row>
                    ) : (
                            
                        <Row>
                            <Col className="modal-description-col mobile">
                                <Row>
                                    <div className="mobile-modal-image-container">
                                        <img className="modal-bio-image" src={img} alt="artist-img"></img>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="modal-date">IN {days_left} DAYS</div>
                                </Row>
                                <Row>
                                    <div className="modal-bio-title">{artist_name.toUpperCase()} - {concert_name.toUpperCase()}
                                    </div>
                                </Row>
                                <Row>
                                    <div className="mobile-modal-info">{weekday.toUpperCase()} | {date} | {time} EST</div>
                                </Row>
                                <Row>
                                    {concert_name === "Part I" ? (
                                        <div className="mobile-modal-bio-description">
                                            <div className="disclaimer">
                                                {"\nALL PROCEEDS WILL BE SPLIT 50/50 BETWEEN THE FOR THE GWORLS & LGBTQ FREEDOM FUND "}
                                            </div>
                                            <a href="https://www.justicespeaks.info/the-cause" target="_blank">learn more about both organizations</a>
                                            <div className="line-up">
                                                {"\n"}LINE UP
                                            </div>
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/achille.png"}
                                                name={"Achille Tenkiang"}
                                                bio={"Achille Tenkiang is an aspiring attorney and creative passionate about connecting and equipping people with the tools and resources they need to advocate for Black Lives. A multitalented performer, Tenkiang is a proud alumnus of Princeton University’s Ellipses Slam Poetry Team and Umqombothi African Music Ensemble. While living in Nairobi, he organized a series of slam poetry workshops with urban refugee youth. And while living in Paris last year, he continued his creative pursuits, starring in Loline Stage and Film’s production of Katori Hall’s award-winning play \"The Mountaintop.\""}
                                                num={1}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/amina.png"}
                                                name={"Amina Iro"}
                                                bio={"Amina Iro, raised in Prince Georges County, MD, holds a B.S. from UW-Madison in Neurobiology and English Creative Writing. Amina has performed in venues including the John F. Kennedy Center for Performing Arts, the Washington Convention Center, the Auditorium Theatre in Chicago, IL, and the State Theatre in Tshwane, South Africa. She is a 2020/2021 Brooklyn Poets Hampton Retreat Fellow. Amina's work can be found in Beltway Poetry Quarterly and Dreginald."}
                                                num={11}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Anjali+Taneja.jpg"}
                                                name={"Anjali Taneja"}
                                                bio={"Listening to Anjali Taneja, it’s easy to hear how she seamlessly blends soulful beats with silken vocal textures fueled by an upbringing in South Asian classical music and R&B. Anjali has performed as an Artist-in-Residence at Strathmore Music Center, Kennedy Center Millennium Stage, Terminal 5 (NYC), Union Stage, Rockwood Music Hall (NYC), the Hamilton among several others, and most recently toured with Red Baraat on the northeast leg of their \"Festival of Colors\" tour. Her upcoming EP is slated for release this summer, and explores themes of identity, culture, and introspection in the eyes of a young woman."}
                                                num={2}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Ben+Barron.jpg"}
                                                name={"Ben Barron"}
                                                bio={"Ben Barron is a musician, film producer, and environmental activist based in Boulder, Colorado. He plays banjo, guitar, and sings in the indie folk quartet The Infamous Flapjack Affair. Learn more about their award-winning film Confluence, which follows the band on a journey through the national parks and monuments of the Colorado River basin, by visiting confluencethejourney.com"}
                                                num={3}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Calvin+Wentling.jpg"}
                                                name={"Calvin Wentling"}
                                                bio={"Calvin Wentling is a vocalist and educator from New York City. Calvin graduated from Princeton University in 2018 with a BA in Music and certificate in African Studies. At Princeton, Calvin sang with the Glee Club and Chamber Choir as well as serving as the Music Director of the Nassoons. Calvin now teaches Music Theory at his alma mater The Saint Thomas Choir School and sings professionally with various choirs in NYC."}
                                                num={4}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/jenna.png"}
                                                name={"Jenna Putnam"}
                                                bio={"Jenna Putnam is a writer, poet, musician, and visual artist living and working in Los Angeles. She likes long walks down dark crooked streets, Arthur Russel, and tasteful nudes."}
                                                num={5}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Julia+Danitz.jpeg"}
                                                name={"Julia Danitz"}
                                                bio={"Julia Danitz, violinist and composer, enjoys a multifaceted and diverse musical career. She has had the pleasure of working in different types concert venues, from playing in ensembles and as soloist at Carnegie Hall and Lincoln Center to the TV set of The Late Show with Stephen Colbert, Live From Here with Chris Thile, and the Barclays Center arena. Trained as a classical violinist, Julia is a graduate of the Juilliard School with a Masters of Music in violin performance and also holds a B.A. in Political Science with a concentration in Business Management from Columbia University. She has had the privilege of working alongside iconic musicians such as Yo-Yo Ma and the Silk Road Ensemble, Chris Thile, Jon Batiste, and more. She is currently pursuing a Doctorate of Musical Arts at the Graduate Center of City University of New York  (CUNY). "}
                                                num={6}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Katie+and+Jerem%C3%ADas.jpg"}
                                                name={"Jeremías Sergiani-Velázquez & Katie Althen"}
                                                bio={"Argentine violinist Jeremías Sergiani-Velázquez and American flutist Katie Althen have presented duo recitals in the U.S. and South America. Katie is known to a wide audience for her contributions to the flute community on Instagram and YouTube as @katieflute, where she has amassed over 85,000 followers and subscribers, as well as over 4,000,000 views. Jeremías has been a member of the Pittsburgh Symphony Orchestra since 2019. Katie and Jeremías are both graduates of The Juilliard School and the New England Conservatory."}
                                                num={7}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Kovey+Coles.png"}
                                                name={"Kovey Coles"}
                                                bio={"Kovey Coles is a rapper/instrumentalist whose guitar-driven songs blend soulful and indie rock vibes into hip-hop. He is currently based in Los Angeles, and you can find his newest release 'TTST' available on all platforms now."}
                                                num={8}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Malachi+Bird.jpg"}
                                                name={"MalPractice"}
                                                bio={"Hailing from Northeast, D.C., Chocolate City’s own MalPractice is trying to give rap a seat at the table. The Inaugural DC Youth Poet Laureate has published three books, four mixtapes, and is the founder of the Crowning Too Early Scholarship Fund. Among the first ever cohort of Black men to receive African-American Studies degrees from Princeton University, MalPrac has always been propelled by love for his city and love for language. He has shared stages with artists such as Talib Kweli, The Last Poets, Chuck Brown, Vic Mensa, A Boogie Wit Da Hoodie, and many more incredible artists. His favorite quote is “Without art, the Earth is just Eh,” and he goes by Practice because he knows that he’ll never be perfect enough."}
                                                num={9}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Sam+Gravitte.jpg"}
                                                name={"Sam Gravitte"}
                                                bio={"Sam is primarily an actor.  A veteran of the Broadway musicals Wicked and Almost Famous, he is an aspiring writer, a burgeoning Marxist, and a player of the guitar, piano, and sax (in descending order of capability). "}
                                                num={10}
                                            />
                                        </div>
                                    ) : (
                                            <div className="mobile-modal-bio-description">
                                                <div className="disclaimer">
                                                    {"\nALL PROCEEDS WILL BE SPLIT 50/50 BETWEEN THE FOR THE GWORLS & LGBTQ FREEDOM FUND "}
                                                </div>
                                                <a href="https://www.justicespeaks.info/the-cause" target="_blank">learn more about both organizations</a>
                                                <div className="line-up">
                                                    {"\n"}LINE UP
                                                </div>
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/achille.png"}
                                                    name={"Achille Tenkiang"}
                                                    bio={"Achille Tenkiang is an aspiring attorney and creative passionate about connecting and equipping people with the tools and resources they need to advocate for Black Lives. A multitalented performer, Tenkiang is a proud alumnus of Princeton University’s Ellipses Slam Poetry Team and Umqombothi African Music Ensemble. While living in Nairobi, he organized a series of slam poetry workshops with urban refugee youth. And while living in Paris last year, he continued his creative pursuits, starring in Loline Stage and Film’s production of Katori Hall’s award-winning play \"The Mountaintop.\""}
                                                    num={1}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/alex.png"}
                                                    name={"Alex Brunson"}
                                                    bio={"Since moving to New York in 2017, Alex has had the pleasure of performing venues across New York, D.C. and along the east coast, as well as internationally with his indie r&b duo, bluesoul. bluesoul comprises Alex on keys and vocals and his good friend Sid Gopinath on guitar and vocals. You can keep up with bluesoul on their instagram, find their debut EP on all streaming platforms, and check out their live work on YouTube."}
                                                    num={9}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Aryeh+Nussbaum+Cohen.jpg"}
                                                    name={"Aryeh Nussbaum Cohen"}
                                                    bio={"Acclaimed as a \"young star\" and \"complete artist\" by the New York Times and \"extravagantly gifted... poised to redefine what’s possible for singers of this distinctive voice type\" by the San Francisco Chronicle, countertenor Aryeh Nussbaum Cohen is one of the classical vocal world's most promising rising stars. Aryeh's first commercial recording - the world premiere recording of Kenneth Fuchs' Poems of Life with the London Symphony Orchestra - won a 2019 GRAMMY® Award in the Best Classical Compendium category. His numerous awards include Grand Finals Winner of the Metropolitan Opera National Council Auditions and Third Prize in Operalia 2019 in Prague, the only American to place in the international competition. Aryeh's performance credits include productions with San Francisco Opera, Theater an der Wien, Houston Grand Opera, Cincinnati Opera and San Francisco Ballet, and concert engagements with the San Francisco Symphony, Philharmonia Baroque Orchestra, the Buffalo Philharmonic and American Bach Soloists; his upcoming engagements will take him to many of the world’s leading opera houses, across Europe and the United States. He is proud to stand in support of the Black Lives Matter Movement."}
                                                    num={2}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/crystal.png"}
                                                    name={"Crystal Valentine"}
                                                    bio={"Born and raised in the Bronx, Crystal Valentine is a nationally and internationally acclaimed poet. Crystal has traveled across seas performing on platforms in Paris, Brazil, Botswana, South Africa and elsewhere. She was named Glamour Magazine's 2016 College Woman of the Year, Teen Vogue's Rising Young Black Thought Leader, and was the recipient of the National Conference of College Women Student Leaders Woman’s Distinction Award. A Callaloo Fellow and former New York City Youth Poet Laureate, Crystal’s work has been featured on programming for MSNBC, Blavity, Button Poetry, BET, CNN, The New York Daily News and more. She earned her B.A in Psychology at New York University, where she is returning as a MFA candidate in Poetry. She is a coordinator for the Bronx Council on the Arts and is the current Wednesday Night host at the Nuyorican Poets Café."}
                                                    num={3}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Dani+Stephenson.jpg"}
                                                    name={"Dani Stephenson"}
                                                    bio={"Dani is a 20-year old musician, singer, and songwriter who was born in Birmingham, Alabama and grew up in Guam, USA. Classically trained in music since she was five years old and a Jazz Studies minor, Dani only began writing her own music halfway through college. Her recent EP, Water Signs (available on all major streaming platforms) fuses low-slung hip hop beats, jazz-inspired melodies, and intimately vulnerable lyrics into a distinct, soulful sound. She is a class of 2020 graduate of Princeton University and will be based in Los Angeles this fall."}
                                                    num={4}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Saunghee+and+Mike.jpg"}
                                                    name={"Delgado & Ko"}
                                                    bio={"Delgado & Ko are an electro-acoustic duo based in New York City. While both have their respective backgrounds in jazz guitar and classical singing, they first started performing popular music together in the funk-afrobeat collective Sensemaya at Princeton. Since then they have started performing regularly in NYC, both as a duo and alongside other musicians and bands, and have expanded their repertoire to include funk, pop, soul, and everything in between."}
                                                    num={10}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Emily+Miller.jpeg"}
                                                    name={"Emily Miller"}
                                                    bio={"Emily spent her time in college in a variety of music groups singing jazz, funk, and pop music. Most recently she’s been active in the soul/folk group \"Baby Dreams.\""}
                                                    num={5}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Kovey+Coles.png"}
                                                    name={"Kovey Coles"}
                                                    bio={"Kovey Coles is a rapper/instrumentalist whose guitar-driven songs blend soulful and indie rock vibes into hip-hop. He is currently based in Los Angeles, and you can find his newest release 'TTST' available on all platforms now."}
                                                    num={6}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Malachi+Bird.jpg"}
                                                    name={"MalPractice"}
                                                    bio={"Hailing from Northeast, D.C., Chocolate City’s own MalPractice is trying to give rap a seat at the table. The Inaugural DC Youth Poet Laureate has published three books, four mixtapes, and is the founder of the Crowning Too Early Scholarship Fund. Among the first ever cohort of Black men to receive African-American Studies degrees from Princeton University, MalPrac has always been propelled by love for his city and love for language. He has shared stages with artists such as Talib Kweli, The Last Poets, Chuck Brown, Vic Mensa, A Boogie Wit Da Hoodie, and many more incredible artists. His favorite quote is “Without art, the Earth is just Eh,” and he goes by Practice because he knows that he’ll never be perfect enough."}
                                                    num={7}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/tanya.png"}
                                                    name={"Tanyaradzwa Tawengwa"}
                                                    bio={"Professor Tanyaradzwa Tawengwa is a Zimbabwean Gwenyambira, composer and singer whose storytelling serves to bridge Zimbabwe's past and present, in order to inform a self-crafted future. Her craft lives at the intersection of music and healing, drawing from the generations of Svikiro (spirit mediums) and N'anga (healers) in her bloodline. Tawengwa is also the founder and music director of the Mushandirapamwe Singers, a Zimbabwean vocal ensemble. Tawengwa earned her B.A. in Music Composition at Princeton University (cum laude), her M.M. in Voice Performance from the University of Kentucky and is currently a doctoral candidate in Voice Performance at the University of Kentucky.\nhttps://www.mushandirapamwe-singers.com/bio"}
                                                    num={8}
                                                />
                                            </div>
                                        )}
                                </Row>
                            </Col>
                        </Row> 
                        )}
                </Grid>
            )}
        </div>
    );
}

export default bioModal;


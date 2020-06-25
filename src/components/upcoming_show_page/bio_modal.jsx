// React Imports
import React, { useState } from "react";

// Styling Imports
import "./upcoming_show_page_styles.scss";
import { Grid, Row, Col } from "../grid";

// Component Imports 
import FestivalBio from "./festival_bio";


const bioModal = ({ days_left, artist_name, concert_name, img, price, weekday, date, time, description, width }) => {
    const toBeImplemented = () => {
        console.log("clicked");
    };

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
                                        <div className="modal-free-button">FREE</div>
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
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/girl.png"}
                                                    name={"Aisha Oxley"}
                                                    bio={"Aisha Oxley is a visual artist, writer and creative based in Chicago, IL, and hailing from Plainfield, NJ. She hosts the podcast, “Young, Original & Black,” which celebrates and curates conversations with young, black creatives pushing the culture forward today."}
                                                    num={11}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/2.png"}
                                                    name={"DJ Rx"}
                                                    bio={"DJ Rx (they/them) is a Baltimore-based DJ and third culture kid whose sets highlight the breadth and creativity of the African diaspora. They are a resident DJ in Miss/chief, a music collective for womxn and nonbinary people of color."}
                                                    num={2}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/3.png"}
                                                    name={"Quiet Light"}
                                                    bio={"Quiet Light is the indie pop-rock solo project of Austin based singer-songwriter Riya Mahesh. She is currently a junior at UT Austin studying Biology and Math. Her debut album will be out on all streaming services in August."}
                                                    num={3}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/4.png"}
                                                    name={"Nayamal Tuor"}
                                                    bio={"My name is Nayamal Tuor.  I'm a vocalist from Tennessee. I think music is such a beautiful decoration of time."}
                                                    num={4}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Tom_Cat.png"}
                                                    name={"Tom Cat"}
                                                    bio={"Tom Cat is a NYC based, Black Non-binary Femme performance artist, community organizer, and internationally recognized spoken word poet whose work lives at the intersection of contemporary queer experiences and racial politics. Since being named the 2014 Washington DC Youth Poetry Champion Tom has worked to substantiate Black Trans and Non-Gender Conforming voices within the national literary community. Leading workshops and creating content that offers perspective interrogate the intersection of gender, race, and sociology."}
                                                    num={5}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/6.png"}
                                                    name={"metroparkavenue"}
                                                    bio={"My name is Christien Ayers, and I release music under the name metroparkavenue. My music is an eclectic blend of different indie music styles that aims to make people feel comfortable being who they want to be."}
                                                    num={6}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/7.png"}
                                                    name={"Kakuyon Mataeh"}
                                                    bio={"Kakuyon Mataeh is a 19 year old trumpet player from Montclair, New Jersey, going into his sophomore year at Princeton University. He's been playing for about 10 years now mostly in the genres of jazz, funk, R&B. Kakuyon has performed at venues like Dizzy's Club Co-ca Cola, Montclair Jazz Festival, and for Ralph Pucci International and alongside critically acclaimed musicians like Chrisitian McBride, Diana Krall, and Ledisi."}
                                                    num={7}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/8.png"}
                                                    name={"Victoria Davidjohn"}
                                                    bio={"Victoria is a theater director, writer, and lighting designer who was born in Charlotte, North Carolina and grew up in San Juan, Puerto Rico. After graduating from Princeton University in 2019 and receiving the Martin A. Dale ’53 Fellowship, she is currently working on writing a new musical about the pivotal work of Black women organizers in the Civil Rights Movement while based in Harlem, New York."}
                                                    num={8}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/crystal.png"}
                                                    name={"Crystal Valentine"}
                                                    bio={"Born and raised in the Bronx, Crystal Valentine is a nationally and internationally acclaimed poet. She was named Glamour Magazine's 2016 College Woman of the Year, Teen Vogue's Rising Young Black Thought Leader, and was the recipient of the National Conference of College Women Student Leaders Woman’s Distinction Award. A Callaloo Fellow and former New York City Youth Poet Laureate,  Crystal’s work has been featured on programming for MSNBC, Blavity, Button Poetry, BET, CNN, The New York Daily News and more. She earned her B.A in Psychology at New York University, where she is returning as a MFA candidate in Poetry. She is a coordinator for the Bronx Council on the Arts and is the current Wednesday Night host at the Nuyorican Poets Café. Crystal is a generator and fierce protector of black joy, and strongly believes that intersectionality is a key factor in liberation. As a queer, black woman, a lot of her work revolves around bridging the ever present gap between her identities. Her goal is to provide a sanctuary within her poems that can be accessible to ALL black people: queer, trans, women, gender non-conforming, disabled, poor, loud, angry, ghetto, for it is when all of these voices are present and accounted for that we can really begin the gruesome work of understanding and breaking down systematic oppression."}
                                                    num={9}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/alex.png"}
                                                    name={"Alex Brunson"}
                                                    bio={"Since moving to New York in 2017, Alex has had the pleasure of performing venues across New York, D.C. and along the east coast, as well as internationally with his indie r&b duo, bluesoul. bluesoul comprises Alex on keys and vocals and his good friend Sid Gopinath on guitar and vocals. You can keep up with bluesoul on their instagram, find their debut EP on all streaming platforms, and check out their live work on YouTube. Alex is currently working on his first solo project, a full length album, to be released later this year. For those interested in his journey as brunson, you're cordially invited to lead him/follow him/join him here."}
                                                    num={10}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/9.png"}
                                                    name={"Zeke"}
                                                    bio={"Yezekiel Williams is a gay, African American poet who often mobilizes his art for queer and black activism. He is currently studying Molecular Biology at Princeton University while pursuing endeavors in creative writing on and off campus."}
                                                    num={20}
                                                />
                                                <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Dani+Stephenson.jpg"}
                                                    name={"Dani Stephenson"}
                                                    bio={"Dani is a 20-year old musician, singer, and songwriter who was born in Birmingham, Alabama and grew up in Guam, USA. Classically trained in music since she was five years old and a Jazz Studies minor, Dani only began writing her own music halfway through college. Her recent EP, Water Signs (available on all major streaming platforms) fuses low-slung hip hop beats, jazz-inspired melodies, and intimately vulnerable lyrics into a distinct, soulful sound. She is a class of 2020 graduate of Princeton University and will be based in Los Angeles this fall."}
                                                    num={21}
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
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/amina.png"}
                                                        name={"Amina Iro"}
                                                        bio={"Amina Iro, raised in Prince Georges County, MD, holds a B.S. from UW-Madison in Neurobiology and English Creative Writing. Amina has performed in venues including the John F. Kennedy Center for Performing Arts, the Washington Convention Center, the Auditorium Theatre in Chicago, IL, and the State Theatre in Tshwane, South Africa. She is a 2020/2021 Brooklyn Poets Hampton Retreat Fellow. Amina's work can be found in Beltway Poetry Quarterly and Dreginald."}
                                                        num={9}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Aryeh+Nussbaum+Cohen.jpg"}
                                                        name={"Aryeh Nussbaum Cohen"}
                                                        bio={"Acclaimed as a \"young star\" and \"complete artist\" by the New York Times and \"extravagantly gifted... poised to redefine what’s possible for singers of this distinctive voice type\" by the San Francisco Chronicle, countertenor Aryeh Nussbaum Cohen is one of the classical vocal world's most promising rising stars. Aryeh's first commercial recording - the world premiere recording of Kenneth Fuchs' Poems of Life with the London Symphony Orchestra - won a 2019 GRAMMY® Award in the Best Classical Compendium category. His numerous awards include Grand Finals Winner of the Metropolitan Opera National Council Auditions and Third Prize in Operalia 2019 in Prague, the only American to place in the international competition. Aryeh's performance credits include productions with San Francisco Opera, Theater an der Wien, Houston Grand Opera, Cincinnati Opera and San Francisco Ballet, and concert engagements with the San Francisco Symphony, Philharmonia Baroque Orchestra, the Buffalo Philharmonic and American Bach Soloists; his upcoming engagements will take him to many of the world’s leading opera houses, across Europe and the United States. He is proud to stand in support of the Black Lives Matter Movement."}
                                                        num={2}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Cierra.png"}
                                                        name={"Cierra"}
                                                        bio={"Cierra Moore is a rising senior at Princeton University, and a member of Princeton's slam poetry group, Ellipses. Normally quite an introverted person, Cierra uses poetry as a safe and explorative outlet for expressing her inner self, her anxious black woman inner self. Recently, in this moment (and movement) when being vocal is so crucial to enacting change, Cierra has been able to find her voice through poetry, and she hopes to continue to use this voice as a rebellion against those who wish her and other black women would remain silenced."}
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
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Drew_Forde.png"}
                                                        name={"Drew Forde"}
                                                        bio={""}
                                                        num={12}
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
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/tanya.png"}
                                                        name={"Tanyaradzwa Tawengwa"}
                                                        bio={"Professor Tanyaradzwa Tawengwa is a Zimbabwean Gwenyambira, composer and singer whose storytelling serves to bridge Zimbabwe's past and present, in order to inform a self-crafted future. Her craft lives at the intersection of music and healing, drawing from the generations of Svikiro (spirit mediums) and N'anga (healers) in her bloodline. Tawengwa is also the founder and music director of the Mushandirapamwe Singers, a Zimbabwean vocal ensemble. Tawengwa earned her B.A. in Music Composition at Princeton University (cum laude), her M.M. in Voice Performance from the University of Kentucky and is currently a doctoral candidate in Voice Performance at the University of Kentucky.\nhttps://www.mushandirapamwe-singers.com/bio"}
                                                        num={8}
                                                    />
                                                    <FestivalBio 
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Tom_Cat.png"}
                                                        name={"Tom Cat"}
                                                        bio={"Tom Cat is a NYC based, Black Non-binary Femme performance artist, community organizer, and internationally recognized spoken word poet whose work lives at the intersection of contemporary queer experiences and racial politics. Since being named the 2014 Washington DC Youth Poetry Champion Tom has worked to substantiate Black Trans and Non-Gender Conforming voices within the national literary community. Leading workshops and creating content that offers perspective interrogates the intersection of gender, race, and sociology."}
                                                        num={11}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/vinod.png"}
                                                        name={"Vinod Krishnamurthy"}
                                                        bio={"Vinod Krishnamurthy is a singer, songwriter and co-producer for the duo Superfriend alongside his close friend (and primary producer) Zayn Mufti. The duo’s inspirations include R&B/soul, psychedelic rock, and jazz. Superfriend has released 2 EPs and a single on all streaming platforms, and they are slated to release their first album in the latter half of 2020. Find them on Instagram @superduperfriend \nIn addition to his passion for creating music, Vinod is also a co-founder of the concert live-streaming startup onfour. https://open.spotify.com/artist/58aQLz2Bw72YzALyncUm9T?si=n6sVr3u_TiW6JABh9QHpjQ"}
                                                        num={13}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Xavier+Washington.jpg"}
                                                        name={"Xavier Washington"}
                                                        bio={"Xavier is a rising senior from Atlanta, GA majoring in African-American Studies at Yale University. He has participated in various musical ensembles and productions during his time in college, including currently taking a gap year in order to sing and travel with the Yale Whiffenpoofs—the nation’s oldest a cappella group. Ultimately, Xavier hopes to one day be a full time artist and entertainer."}
                                                        num={7}
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
                                    {concert_name === "Part III" ? (
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
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/girl.png"}
                                                name={"Aisha Oxley"}
                                                bio={"Aisha Oxley is a visual artist, writer and creative based in Chicago, IL, and hailing from Plainfield, NJ. She hosts the podcast, “Young, Original & Black,” which celebrates and curates conversations with young, black creatives pushing the culture forward today."}
                                                num={11}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/2.png"}
                                                name={"DJ Rx"}
                                                bio={"DJ Rx (they/them) is a Baltimore-based DJ and third culture kid whose sets highlight the breadth and creativity of the African diaspora. They are a resident DJ in Miss/chief, a music collective for womxn and nonbinary people of color."}
                                                num={2}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/3.png"}
                                                name={"Quiet Light"}
                                                bio={"Quiet Light is the indie pop-rock solo project of Austin based singer-songwriter Riya Mahesh. She is currently a junior at UT Austin studying Biology and Math. Her debut album will be out on all streaming services in August."}
                                                num={3}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/4.png"}
                                                name={"Nayamal Tuor"}
                                                bio={"My name is Nayamal Tuor.  I'm a vocalist from Tennessee. I think music is such a beautiful decoration of time."}
                                                num={4}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Tom_Cat.png"}
                                                name={"Tom Cat"}
                                                bio={"Tom Cat is a NYC based, Black Non-binary Femme performance artist, community organizer, and internationally recognized spoken word poet whose work lives at the intersection of contemporary queer experiences and racial politics. Since being named the 2014 Washington DC Youth Poetry Champion Tom has worked to substantiate Black Trans and Non-Gender Conforming voices within the national literary community. Leading workshops and creating content that offers perspective interrogate the intersection of gender, race, and sociology."}
                                                num={5}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/6.png"}
                                                name={"metroparkavenue"}
                                                bio={"My name is Christien Ayers, and I release music under the name metroparkavenue. My music is an eclectic blend of different indie music styles that aims to make people feel comfortable being who they want to be."}
                                                num={6}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/7.png"}
                                                name={"Kakuyon Mataeh"}
                                                bio={"Kakuyon Mataeh is a 19 year old trumpet player from Montclair, New Jersey, going into his sophomore year at Princeton University. He's been playing for about 10 years now mostly in the genres of jazz, funk, R&B. Kakuyon has performed at venues like Dizzy's Club Co-ca Cola, Montclair Jazz Festival, and for Ralph Pucci International and alongside critically acclaimed musicians like Chrisitian McBride, Diana Krall, and Ledisi."}
                                                num={7}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/8.png"}
                                                name={"Victoria Davidjohn"}
                                                bio={"Victoria is a theater director, writer, and lighting designer who was born in Charlotte, North Carolina and grew up in San Juan, Puerto Rico. After graduating from Princeton University in 2019 and receiving the Martin A. Dale ’53 Fellowship, she is currently working on writing a new musical about the pivotal work of Black women organizers in the Civil Rights Movement while based in Harlem, New York."}
                                                num={8}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/crystal.png"}
                                                name={"Crystal Valentine"}
                                                bio={"Born and raised in the Bronx, Crystal Valentine is a nationally and internationally acclaimed poet. She was named Glamour Magazine's 2016 College Woman of the Year, Teen Vogue's Rising Young Black Thought Leader, and was the recipient of the National Conference of College Women Student Leaders Woman’s Distinction Award. A Callaloo Fellow and former New York City Youth Poet Laureate,  Crystal’s work has been featured on programming for MSNBC, Blavity, Button Poetry, BET, CNN, The New York Daily News and more. She earned her B.A in Psychology at New York University, where she is returning as a MFA candidate in Poetry. She is a coordinator for the Bronx Council on the Arts and is the current Wednesday Night host at the Nuyorican Poets Café. Crystal is a generator and fierce protector of black joy, and strongly believes that intersectionality is a key factor in liberation. As a queer, black woman, a lot of her work revolves around bridging the ever present gap between her identities. Her goal is to provide a sanctuary within her poems that can be accessible to ALL black people: queer, trans, women, gender non-conforming, disabled, poor, loud, angry, ghetto, for it is when all of these voices are present and accounted for that we can really begin the gruesome work of understanding and breaking down systematic oppression."}
                                                num={9}
                                            />
                                            <FestivalBio
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/alex.png"}
                                                name={"Alex Brunson"}
                                                bio={"Since moving to New York in 2017, Alex has had the pleasure of performing venues across New York, D.C. and along the east coast, as well as internationally with his indie r&b duo, bluesoul. bluesoul comprises Alex on keys and vocals and his good friend Sid Gopinath on guitar and vocals. You can keep up with bluesoul on their instagram, find their debut EP on all streaming platforms, and check out their live work on YouTube. Alex is currently working on his first solo project, a full length album, to be released later this year. For those interested in his journey as brunson, you're cordially invited to lead him/follow him/join him here."}
                                                num={10}
                                            />
                                            <FestivalBio 
                                                img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/9.png"}
                                                name={"Zeke"}
                                                bio={"Yezekiel Williams is a gay, African American poet who often mobilizes his art for queer and black activism. He is currently studying Molecular Biology at Princeton University while pursuing endeavors in creative writing on and off campus."}
                                                num={20}
                                            />
                                            <FestivalBio
                                                    img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Dani+Stephenson.jpg"}
                                                    name={"Dani Stephenson"}
                                                    bio={"Dani is a 20-year old musician, singer, and songwriter who was born in Birmingham, Alabama and grew up in Guam, USA. Classically trained in music since she was five years old and a Jazz Studies minor, Dani only began writing her own music halfway through college. Her recent EP, Water Signs (available on all major streaming platforms) fuses low-slung hip hop beats, jazz-inspired melodies, and intimately vulnerable lyrics into a distinct, soulful sound. She is a class of 2020 graduate of Princeton University and will be based in Los Angeles this fall."}
                                                    num={21}
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
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/amina.png"}
                                                        name={"Amina Iro"}
                                                        bio={"Amina Iro, raised in Prince Georges County, MD, holds a B.S. from UW-Madison in Neurobiology and English Creative Writing. Amina has performed in venues including the John F. Kennedy Center for Performing Arts, the Washington Convention Center, the Auditorium Theatre in Chicago, IL, and the State Theatre in Tshwane, South Africa. She is a 2020/2021 Brooklyn Poets Hampton Retreat Fellow. Amina's work can be found in Beltway Poetry Quarterly and Dreginald."}
                                                        num={9}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Aryeh+Nussbaum+Cohen.jpg"}
                                                        name={"Aryeh Nussbaum Cohen"}
                                                        bio={"Acclaimed as a \"young star\" and \"complete artist\" by the New York Times and \"extravagantly gifted... poised to redefine what’s possible for singers of this distinctive voice type\" by the San Francisco Chronicle, countertenor Aryeh Nussbaum Cohen is one of the classical vocal world's most promising rising stars. Aryeh's first commercial recording - the world premiere recording of Kenneth Fuchs' Poems of Life with the London Symphony Orchestra - won a 2019 GRAMMY® Award in the Best Classical Compendium category. His numerous awards include Grand Finals Winner of the Metropolitan Opera National Council Auditions and Third Prize in Operalia 2019 in Prague, the only American to place in the international competition. Aryeh's performance credits include productions with San Francisco Opera, Theater an der Wien, Houston Grand Opera, Cincinnati Opera and San Francisco Ballet, and concert engagements with the San Francisco Symphony, Philharmonia Baroque Orchestra, the Buffalo Philharmonic and American Bach Soloists; his upcoming engagements will take him to many of the world’s leading opera houses, across Europe and the United States. He is proud to stand in support of the Black Lives Matter Movement."}
                                                        num={2}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Cierra.png"}
                                                        name={"Cierra"}
                                                        bio={"Cierra Moore is a rising senior at Princeton University, and a member of Princeton's slam poetry group, Ellipses. Normally quite an introverted person, Cierra uses poetry as a safe and explorative outlet for expressing her inner self, her anxious black woman inner self. Recently, in this moment (and movement) when being vocal is so crucial to enacting change, Cierra has been able to find her voice through poetry, and she hopes to continue to use this voice as a rebellion against those who wish her and other black women would remain silenced."}
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
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Drew_Forde.png"}
                                                        name={"Drew Forde"}
                                                        bio={""}
                                                        num={12}
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
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/tanya.png"}
                                                        name={"Tanyaradzwa Tawengwa"}
                                                        bio={"Professor Tanyaradzwa Tawengwa is a Zimbabwean Gwenyambira, composer and singer whose storytelling serves to bridge Zimbabwe's past and present, in order to inform a self-crafted future. Her craft lives at the intersection of music and healing, drawing from the generations of Svikiro (spirit mediums) and N'anga (healers) in her bloodline. Tawengwa is also the founder and music director of the Mushandirapamwe Singers, a Zimbabwean vocal ensemble. Tawengwa earned her B.A. in Music Composition at Princeton University (cum laude), her M.M. in Voice Performance from the University of Kentucky and is currently a doctoral candidate in Voice Performance at the University of Kentucky.\nhttps://www.mushandirapamwe-singers.com/bio"}
                                                        num={8}
                                                    />
                                                    <FestivalBio 
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Tom_Cat.png"}
                                                        name={"Tom Cat"}
                                                        bio={"Tom Cat is a NYC based, Black Non-binary Femme performance artist, community organizer, and internationally recognized spoken word poet whose work lives at the intersection of contemporary queer experiences and racial politics. Since being named the 2014 Washington DC Youth Poetry Champion Tom has worked to substantiate Black Trans and Non-Gender Conforming voices within the national literary community. Leading workshops and creating content that offers perspective interrogates the intersection of gender, race, and sociology."}
                                                        num={11}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/vinod.png"}
                                                        name={"Vinod Krishnamurthy"}
                                                        bio={"Vinod Krishnamurthy is a singer, songwriter and co-producer for the duo Superfriend alongside his close friend (and primary producer) Zayn Mufti. The duo’s inspirations include R&B/soul, psychedelic rock, and jazz. Superfriend has released 2 EPs and a single on all streaming platforms, and they are slated to release their first album in the latter half of 2020. Find them on Instagram @superduperfriend \nIn addition to his passion for creating music, Vinod is also a co-founder of the concert live-streaming startup onfour. https://open.spotify.com/artist/58aQLz2Bw72YzALyncUm9T?si=n6sVr3u_TiW6JABh9QHpjQ"}
                                                        num={13}
                                                    />
                                                    <FestivalBio
                                                        img={"https://onfour-media.s3.amazonaws.com/upcoming_show_poster/festival/Xavier+Washington.jpg"}
                                                        name={"Xavier Washington"}
                                                        bio={"Xavier is a rising senior from Atlanta, GA majoring in African-American Studies at Yale University. He has participated in various musical ensembles and productions during his time in college, including currently taking a gap year in order to sing and travel with the Yale Whiffenpoofs—the nation’s oldest a cappella group. Ultimately, Xavier hopes to one day be a full time artist and entertainer."}
                                                        num={7}
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


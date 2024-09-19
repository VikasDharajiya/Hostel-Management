import React from 'react';
import '../../../App.css';
import nikitaImage from '../../../assets/profile-pic-nikita.png';
import palakImage from '../../../assets/profile-pic-palak.png';
import vikasImage from '../../../assets/profile-pic-vikas.png';
import falguniImage from '../../../assets/profile-pic-falguni.png';
import bhavyImage from '../../../assets/profile-pic-bhavy.png';
import priyanshImage from '../../../assets/profile-pic-priyansh.png';
import chintanImage from '../../../assets/profile-pic-chintan.png';
import vishalImage from '../../../assets/profile-pic-vishal.jpg';







const teamMembers = [
    {
        image: nikitaImage,
        name: 'Nikita Purohit',
        position: 'Team Leader',
        dev: 'Backend Developer'

    },
    {
        image: vishalImage,
        name: 'Vishal Prajapati',
        position: 'Team Member',
        dev: 'UI/UX Designer'
    },
    {
        image: palakImage,
        name: 'Palak Panchiwala',
        position: 'Team Member',
        dev: 'Backend Developer'
    },
    {
        image: vikasImage,
        name: 'Vikas Dharajiya ',
        position: 'Team Member',
        dev: 'Front-End Developer'
    },
    {
        image: falguniImage,
        name: 'Falguni Chaudhary',
        position: 'Team Member',
        dev: 'Front-End Developer'
    },
    {
        image: priyanshImage,
        name: 'Priyansh Aal',
        position: 'Team Member',
        dev: 'Front-End Developer'
    },
    {
        image: chintanImage,
        name: 'Chintan Chauhan',
        position: 'Team Member',
        dev: 'Front-End Developer'
    },
    {
        image: bhavyImage,
        name: 'Bhavy Patel',
        position: 'Team Member',
        dev: 'Full Stack Developer'
    },
];

const TeamCard = ({ member }) => {
    return (
        <div className="team-card">
            <img src={member.image} alt={`${member.name}`} className="team-card__image" />
            <h2 className="team-card__name">{member.name}</h2>
            <p className="team-card__position">{member.position}</p>
            {/* <p className="team-card__experience">{member.experience} Developer</p> */}
            <p className="team-card__dev">{member.dev}</p>
        </div>
    );
};

const Team = () => {
    return (
        <div className="app">
            <h1> Meet Our Team</h1>
            <div className="team-cards-container">
                {teamMembers.map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>
        </div>
    );
};

export default Team;

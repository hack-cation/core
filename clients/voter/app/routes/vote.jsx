import {VotePage} from "../pages/VotePage/VotePage.jsx";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export default function VoteRoute({loaderData}) {
    const {campaign, projects, isReturningGuest} = loaderData;
    const navigate = useNavigate()

    useEffect(() => {
        if (!campaign.isActive) {
            navigate(`/campaign/${campaign.id}`)
        }
    }, [campaign.isActive, navigate])

    if (campaign.isActive) {
        return (
            <VotePage
                {...campaign}
                projects={projects}
                isReturningGuest={isReturningGuest}
            />
        );
    } else {

    }
}

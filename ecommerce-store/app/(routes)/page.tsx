import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";

export const revalidate = 0

const HomePage = async () => {
    const billboard = await getBillboard("117d3899-5876-484e-ac5e-8d9f8fe6c566")
    return ( 
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard} />
            </div>
        </Container>
    );
}

export default HomePage
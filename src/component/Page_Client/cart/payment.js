import _container from '../../Asset/css/_container.module.css'
import _payment from '../../Asset/css/_payment.module.css'


const Payment = () => {
    return (
        <div>
            <div className={_container.container}>
            <form action="/action_page.php">
                <label for="fname">First Name</label>
                <input className={_payment.input} type="text" id="fname" name="firstname" placeholder="Your name.."/>

                <label for="lname">Last Name</label>
                <input className={_payment.input} type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                <label for="lname">Last Name</label>
                <input className={_payment.input} type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                <label for="lname">Last Name</label>
                <input className={_payment.input} type="text" id="lname" name="lastname" placeholder="Your last name.."/>
            
                <input className={_payment.input} type="submit" value="Submit"/>
            </form>
            </div>
        </div>
    )
};

export default Payment;
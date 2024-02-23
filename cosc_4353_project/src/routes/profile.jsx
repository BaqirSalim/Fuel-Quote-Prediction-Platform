import { useState } from "react";

export default function Profile() {
    const [fullName, setFullName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    return (
        <div>
            <h2>Client Profile Management</h2>
            <form>
                <div>
                    <label htmlFor="full_name"><strong>Full Name</strong></label><br />
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        maxLength={50}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address1"><strong>Address 1</strong></label><br />
                    <input
                        type="text"
                        id="address1"
                        name="address1"
                        placeholder="Enter Address 1"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        maxLength={100}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address2"><strong>Address 2</strong></label><br />
                    <input
                        type="text"
                        id="address2"
                        name="address2"
                        placeholder="Enter Address 2 (Optional)"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        maxLength={100}
                    />
                </div>
                <div>
                    <label htmlFor="city"><strong>City</strong></label><br />
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        maxLength={100}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state"><strong>State</strong></label><br />
                    <select
                        id="state"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    >
                        <option value="">Select State</option>
                        {/* Add state options here */}
                    </select>
                </div>
                <div>
                    <label htmlFor="zipcode"><strong>Zipcode</strong></label><br />
                    <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        placeholder="Enter Zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        minLength={5}
                        maxLength={9}
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

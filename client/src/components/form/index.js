import './styles.css';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { config } from '../../App';


const schema = yup.object().shape({
    name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    contactNumber: yup.string()
    .matches(/^[0-9]{10}$/, 'Contact Number must be 10 digits')
    .required('Contact Number is required'),
    courseLevel: yup.object().shape({
        value: yup.string().required('courseLevel is required'),
        label: yup.string().required('courseLevel is required (from label)')
    })
    .nullable()
    .required("courseLevel is required (from outer null check)"),
    countryPreferences: yup.array()
    .min(1, 'You must select at least one country')
    .of(
        yup.object().shape({
            value: yup.string().required('countryPreferences is required'),
            label: yup.string().required('countryPreferences is required (from label)')
        })
    )
    .nullable()
    .required("countryPreferences is required (from outer null check)"),
    dateOfBirth: yup.date(),
});

const Form = () => {

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });

    const checkUser = async (user) => {
        console.log(user.email);
        try {
            const response = await axios.get(`${config.baseUrl}/users/${user.email}`);
            const data = response.data;
            console.log('checkUser', data.length);
            if(data.length > 0) {
                toast.info('Email already exists. Updating user...');
                updateUser(user)
            }
            else {
                toast.info('Creating new user...');
                createUser(user)
            }
        }
        catch (error) {
            toast.error('Error checking user');
            console.log(error);
        }
    }

    const createUser = async (user) => {
        console.log(user);
        try {
            const response = await axios.post(`${config.baseUrl}/user/create`, user);
            const data = response.data
            console.log('create user', data);
            toast.success('User created successfully');
        }
        catch (error) {
            console.log(error);
            toast.error('User creation failed');
        }
    }

    const updateUser = async (user) => {
        console.log(user);
        try {
            const response = await axios.put(`${config.baseUrl}/user/update`, user);
            const data = response.data
            console.log('update user', data);
            toast.success('User updated successfully');
        }
        catch (error) {
            console.log(error);
            toast.error('User update failed');
        }
    }

    const submitForm = (data) => {
        toast.success('Form submitted successfully');
        data = {
            ...data,
            courseLevel: data.courseLevel.value,
            countryPreferences: data.countryPreferences.map(country => country.value).join(', '),
            contactNumber: parseInt(data.contactNumber),
            dateOfBirth: new Date(data.dateOfBirth).toLocaleDateString()
        }
        checkUser(data);
    }

    return (
        <div className="form-container">
            <div className="form">
                <div className="form-header">
                    <h2>Create Form</h2>
                </div>
                <form className="form-body" onSubmit={handleSubmit(submitForm)}>
                    <input 
                        placeholder='Enter Name..'
                        {...register("name")}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                    <input
                        placeholder='Enter Email..'
                        {...register("email")}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    <input
                        placeholder='Enter Contact Number..'
                        {...register("contactNumber")}
                    />
                    {errors.contactNumber && <p className="error">{errors.contactNumber.message}</p>}
                    <Controller
                        name="courseLevel"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className='select'
                                isClearable
                                placeholder="Select Course Level"
                                options={[
                                    { value: 'UG', label: 'UG' },
                                    { value: 'PG', label: 'PG' },
                                ]}
                            />
                        )}
                    />
                    {errors.courseLevel && <p className='error'>{errors.courseLevel.message || errors.courseLevel.label.message}</p>}
                    <Controller
                        name="countryPreferences"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className='select'
                                placeholder='Select Country Preferences..'
                                isClearable
                                isMulti
                                options={[
                                    { value: 'USA', label: 'USA' },
                                    { value: 'Australia', label: 'Australia' },
                                    { value: 'New-Zealand', label: 'New-Zealand' },
                                    { value: 'Canada', label: 'Canada' },
                                    { value: 'UK', label: 'UK' },
                                    { value: 'Ireland', label: 'Ireland' },
                                    { value: 'Germany', label: 'Germany' },
                                ]}
                            />
                        )} 
                    />
                    {errors.countryPreferences && <p className="error">{errors.countryPreferences.message || errors.countryPreferences.label.message}</p>}
                    <input
                        type='date'
                        placeholder='Enter Date Of Birth..'
                        {...register("dateOfBirth")}
                    />
                    {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
                    <div className="form-footer">
                        <input
                            className='submit-btn'
                            type="submit"
                            placeholder='Submit'
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Form;
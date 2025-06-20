import {
  Container,
  Title,
  Text,
  Paper,
  TextInput,
  Group,
  Button,
  Stack,
  Divider,
  Grid,
  ThemeIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconUser, IconDeviceMobile, IconLock } from '@tabler/icons-react';
import axios from 'axios';
import { useState } from 'react';
import { purchaseNonStudentTicket } from '../services/ticketService';
import classes from './HomePage.module.css';

export function NonStudentTicketPage() {
  const [loading, setLoading] = useState(false);
  const ticketPrice = 100.0;
  const total = ticketPrice;

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
    validate: {
      fullName: (value) => (value.length < 2 ? 'Full name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phoneNumber: (value) =>
        value.length < 10 ? 'Phone number must have at least 10 digits' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const response = await purchaseNonStudentTicket(values);
      window.location.href = response.paymentUrl;
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      notifications.show({
        title: 'Purchase Failed',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={classes.hero}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>Purchase Your HOJ 25&apos; Ticket Here 🎉</Title>

              <Text className={classes.description} mt={30}>
                Secure your spot at the most exciting events. Easy registration, instant
                confirmation.
              </Text>

              <Text className={classes.description} mt={10}>
                🎵 Come and enjoy music like never before.....
              </Text>
            </div>
          </div>
        </Container>
      </div>

      <Container size="md" my="xl">
        <Paper withBorder shadow="md" p="xl" radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="xl">
              <Stack gap={0} align="center">
                <Title order={2}>Non Student Ticket</Title>
                <Text c="dimmed">Fill in your details to purchase your ticket</Text>
              </Stack>

              <Stack>
                <Group>
                  <IconUser />
                  <Text fw={500}>Personal Information</Text>
                </Group>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Full Name"
                      placeholder="Enter your full name"
                      required
                      {...form.getInputProps('fullName')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Email Address"
                      placeholder="your.email@example.com"
                      required
                      {...form.getInputProps('email')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Phone Number"
                      placeholder="+233 24 123 4567"
                      required
                      {...form.getInputProps('phoneNumber')}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>

              <Paper withBorder p="md" radius="md" bg="green.0">
                <Stack>
                  <Group>
                    <IconDeviceMobile />
                    <Text fw={500}>Payment Method</Text>
                  </Group>
                  <Paper withBorder p="md" radius="sm" bg="white">
                    <Group>
                      <ThemeIcon variant="white" c="green">
                        <IconDeviceMobile />
                      </ThemeIcon>
                      <Stack gap={0}>
                        <Text fw={500} size="sm">
                          Mobile Money Payment
                        </Text>
                        <Text size="xs" c="dimmed">
                          Powered by PayStack - Secure & Fast
                        </Text>
                      </Stack>
                    </Group>
                  </Paper>
                </Stack>
              </Paper>

              <Stack>
                <Text fw={500}>Order Summary</Text>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm">Ticket Type:</Text>
                    <Text size="sm">Non-Student</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">Price:</Text>
                    <Text size="sm">Gh {ticketPrice.toFixed(2)}</Text>
                  </Group>
                  <Divider />
                  <Group justify="space-between">
                    <Text fw={500}>Total:</Text>
                    <Text fw={500}>Gh {total.toFixed(2)}</Text>
                  </Group>
                </Stack>
              </Stack>

              <Button
                type="submit"
                fullWidth
                size="lg"
                leftSection={<IconLock size={20} />}
                color="gray"
                variant="filled"
                loading={loading}
              >
                Proceed to Secure Payment
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
} 